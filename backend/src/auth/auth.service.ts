// auth.service.ts

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/Component/user/schemas/user.schema';
import { UserService } from 'src/Component/user/user.service';
import { ChangePasswordDto } from './dto/change-password-dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password-dto/reset-password.dto';
import { PasswordResetUtil } from 'src/utils/password-reset.util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordResetUtil: PasswordResetUtil,
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = { username: user.firstName, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, email: user.email };
    }
    return null;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.generateToken(user); // Generate token for the authenticated user
    return { accessToken, role: user.role }; // Include role in the response
  }

  async validateUserById(id: string): Promise<any> {
    return this.userService.findById(id);
  }

  async changePassword(
    email: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<object> {
    try {
      this.logger.log(`Requested for change password by email: ${email}`);

      const { oldPassword, newPassword } = changePasswordDto;
      const user = await this.userService.findById(email);

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Old password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      this.logger.log(`Your password updated succeefully`);

      user.password = hashedPassword;

      await (user as any).save();

      return { isSuccess: true, data: true };
    } catch (error) {
      this.logger.error(`Error when change password error: ${error}`);
    }
  }

  async forgetPassword(email: string): Promise<object> {
    try {
      this.logger.log(`Try for forgot-password emailId: ${email}`);

      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        this.logger.log(`Email id is not found in system!`);
        throw new NotFoundException('User not found');
      }

      const resetToken = this.passwordResetUtil.generateResetToken(user);

      this.logger.log(`Sending email for reset password: ${email}`);
      await this.passwordResetUtil.sendResetEmail(email, resetToken);

      return { isSuccess: true, data: true };
    } catch (error) {
      this.logger.log(`Error when reset-email error: ${error}`);
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    try {
      const { newPassword, token } = resetPasswordDto;

      const tokenExtrectUser =
        await this.passwordResetUtil.decodeResetToken(token);

      const user = await this.userService.findOneByEmail(
        tokenExtrectUser?.email,
      );

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!(await this.passwordResetUtil.verifyResetToken(user, token))) {
        throw new UnauthorizedException('Invalid password reset token');
      }

      // Reset user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      this.logger.log(`Password updated `);

      user.password = hashedPassword;
      await (user as any).save();
    } catch (error) {
      this.logger.error(`Error when reset-email error: ${error}`);
    }
  }
}
