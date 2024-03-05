import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from './roles.decorator';
import { Request } from 'express';

interface IRequest extends Request {
  session: any;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req: IRequest = context.switchToHttp().getRequest();
    const user = req.session;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
