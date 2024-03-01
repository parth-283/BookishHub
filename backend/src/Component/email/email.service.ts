import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendWelcomeEmail(email: string, verificationToken: string): Promise<void> {
    try {
      const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;
      const message = `
        <h1>Welcome to our platform!</h1>
        <p>Thank you for joining us.</p>
        <p>Please verify your email address by clicking <a href="${verificationUrl}">here</a>.</p>
      `;

      await this.transporter.sendMail({
        from: process.env.EMAIL,
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
      const message = `
        <h1>Password Reset</h1>
        <p>You have requested to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <a href="https://yourwebsite.com/reset-password">Reset Password</a>
      `;

      await this.transporter.sendMail({
        from: process.env.EMAIL,
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
