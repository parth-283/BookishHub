import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers['authorization'];

    if (!authToken || !authToken.startsWith('Bearer ')) {
      return false;
    }

    const token = authToken.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (err) {
      return false;
    }
  }
}
