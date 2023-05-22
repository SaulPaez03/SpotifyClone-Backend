import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from './constants';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  private getToken(request: Request) {
    const parts = request.headers.authorization?.split(' ') || [];
    return parts[0] === 'Bearer' ? parts[1] : undefined;
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
