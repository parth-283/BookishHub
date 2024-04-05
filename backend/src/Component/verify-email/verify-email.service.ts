import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyEmail(token: string): Promise<boolean> {
    try {
      this.logger.log(`Decoding the token to extract the email address`);
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const email = decodedToken.email;

      this.logger.log(
        `Retrieving the user from the database using the email address:${email}`,
      );
      const user = await this.userService.findOneByEmail(email);

      if (user) {
        if (!user.isValid) {
          this.logger.log(
            `Updating the isValid flag to true for user with ID: ${user.id}`,
          );
          await this.userService.update(user.id, { isValid: true });
          return true; // Return true to indicate successful verification
        } else {
          this.logger.log(`User already verified by email: ${email}`);
          throw new HttpException('User already verified!', HttpStatus.CONFLICT);
        }
      } else {
        this.logger.log(`User not found for email: ${email}`);
        throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.error(`Error verifying email token: ${error.message}`);
      throw new HttpException('Token invalid!', HttpStatus.UNAUTHORIZED);
    }
  }
}
