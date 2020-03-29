import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserStatus } from 'src/core/enums/user-status.enum';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () => roles.includes(user.role);
    const activated = user.status === UserStatus.ACTIVATE;

    return user && user.role && hasRole() && activated;
  }
}
