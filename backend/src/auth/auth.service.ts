// auth.service.ts

import {
  BadRequestException,
  Injectable,
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
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.userService.findById(id);

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await (user as any).save();
  }

  async forgetPassword(email: string): Promise<void> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = this.passwordResetUtil.generateResetToken(user);
    await this.passwordResetUtil.sendResetEmail(email, resetToken);
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
    const { email, newPassword, token } = resetPasswordDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await this.passwordResetUtil.verifyResetToken(user, token))) {
      throw new UnauthorizedException('Invalid password reset token');
    }

    // Reset user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await (user as any).save();
  }
}
