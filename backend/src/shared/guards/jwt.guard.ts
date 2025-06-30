import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard, IAuthGuard } from "@nestjs/passport";

import { IS_PUBLIC_KEY } from "../decorators/allow-public-access.decorator";
import { AuthenticatedPayload } from "../types/payload-jwt";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") implements IAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    if (this.isPublic(context)) {
      return true;
    }

    return super.canActivate(context);
  }

  isPublic(ctx: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [ctx.getHandler(), ctx.getClass()]);

    if (isPublic) {
      return true;
    }
  }

  handleRequest<Account extends AuthenticatedPayload>(_: Error, user: Account): Account {
    if (user) return user;
    else throw new UnauthorizedException();
  }
}
