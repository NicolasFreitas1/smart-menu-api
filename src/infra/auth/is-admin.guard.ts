import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_ADMIN_KEY } from './is-admin'

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiresAdmin = this.reflector.getAllAndOverride<boolean>(
      IS_ADMIN_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!requiresAdmin) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    return user?.isAdmin === true
  }
}
