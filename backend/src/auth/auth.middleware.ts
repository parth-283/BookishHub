import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    try {
      const decoded = this.jwtService.verify(token);
      req['user'] = decoded; // Attach decoded user info to the request
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid authentication token');
    }
  }
}
