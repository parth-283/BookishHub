import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import welcomeMessage from './welcomeMessage';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
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

  async sendWelcomeEmail(
    email: string,
    verificationToken: string,
  ): Promise<void> {
    try {
      const verificationUrl = `${process.env.FRONTEND_END_POINT}/verify-email?token=${verificationToken}`;
      const message = welcomeMessage(verificationUrl);

      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Welcome to Our Platform',
        html: message,
      });

      this.logger.log(`Welcome email send successfully.`);
    } catch (error) {
      this.logger.log(`Error on reset email error:${error}`);
      throw error;
    }
  }

  async sendPasswordResetEmail(
    email: string,
    resetLink: string,
  ): Promise<void> {
    try {
      const message = `
        <h1>Password Reset</h1>
        <p>You have requested to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
      `;

      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset Request',
        html: message,
      });

      this.logger.log(`Password reset email sent successfully.`);
    } catch (error) {
      this.logger.log(`Error on reset email error:${error}`);
      throw error;
    }
  }
}
