import * as crypto from 'crypto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EmailService } from 'src/Component/email/email.service';

@Injectable()
export class PasswordResetUtil {
  private readonly logger = new Logger(PasswordResetUtil.name);
  constructor(private readonly mailService: EmailService) {}

  async decodeResetToken(
    token: string,
  ): Promise<{ email: string; timestamp: number }> {
    try {
      console.log(token);
      // Decode the token
      const tokenData = crypto.createHash('sha256').update(token).digest('hex');
      console.log(tokenData);

      // Extract email and timestamp by splitting the decoded token
      const [email, timestampStr] = tokenData.split(':');

      const timestamp = parseInt(timestampStr, 10);

      if (isNaN(timestamp)) {
        throw new Error('Invalid token format');
      }

      return { email, timestamp };
    } catch (error) {
      this.logger.error(`Error when reset-email error: ${error}`);
      new NotFoundException(error);
    }
  }

  generateResetToken(user: any): string {
    // Generate a reset token specific to the user
    const tokenData = user.email + user.createdAt; // Include user-specific data for uniqueness
    const token = crypto.createHash('sha256').update(tokenData).digest('hex'); // Hash the token data
    return token;
  }

  async verifyResetToken(user: any, token: string): Promise<boolean> {
    // Generate the expected reset token based on the user's data
    const expectedToken = this.generateResetToken(user);
    // Compare the expected token with the provided token
    return token === expectedToken;
  }

  async sendResetEmail(email: string, resetToken: string): Promise<void> {
    try {
      const resetLink: string = `http://localhost:3000/reset-password?token=${resetToken}`;

      await this.mailService.sendPasswordResetEmail(email, resetLink);

      this.logger.log(`Reset email sent to ${email}`);
    } catch (error) {
      this.logger.log(`Error when reset-email error: ${error}`);
      new NotFoundException(error);
    }
  }
}
