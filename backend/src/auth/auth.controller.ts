// auth.controller.ts

import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/change-password-dto/change-password.dto';
import { User } from 'src/Component/user/schemas/user.schema';
import { ResetPasswordDto } from './dto/reset-password-dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }

  @Post('change-password')
  @UseGuards(AuthGuard())
  async changePassword(
    @Req() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user: User = req.user;
    await this.authService.changePassword(user.id, changePasswordDto);
  }

  @Post('forget-password')
  async forgetPassword(@Body('email') email: string): Promise<void> {
    await this.authService.forgetPassword(email);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<any> {
    return this.authService.refreshToken(refreshToken);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    await this.authService.resetPassword(resetPasswordDto);
  }
}
