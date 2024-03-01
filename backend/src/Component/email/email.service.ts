import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendWelcomeEmail(
    email: string,
    verificationToken: string,
  ): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-password',
        },
      });

      const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

      // Example welcome email message with verification URL
      const message = `
            <h1>Welcome to our platform!</h1>
            <p>Thank you for joining us.</p>
            <p>Please verify your email address by clicking <a href="${verificationUrl}">here</a>.</p>
          `;

      await transporter.sendMail({
        from: 'your@email.com',
        to: email,
        subject: 'Welcome to Our Platform',
        html: message,
      });

      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-password',
        },
      });

      // Example password reset email message
      const message = `
        <h1>Password Reset</h1>
        <p>You have requested to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <a href="https://yourwebsite.com/reset-password">Reset Password</a>
      `;

      await transporter.sendMail({
        from: 'your@email.com',
        to: email,
        subject: 'Password Reset Request',
        html: message,
      });

      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
}
