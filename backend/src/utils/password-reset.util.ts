import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/Component/email/email.service';

@Injectable()
export class PasswordResetUtil {
  constructor(private readonly mailService: EmailService) {}

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
      const resetLink = `https://yourwebsite.com/reset-password?token=${resetToken}`;

    //   await this.mailService.sendPasswordResetEmail(email, resetLink);

      console.log(`Reset email sent to ${email}`);
    } catch (error) {
      console.error('Error sending reset email:', error);
      throw error;
    }
  }
}
