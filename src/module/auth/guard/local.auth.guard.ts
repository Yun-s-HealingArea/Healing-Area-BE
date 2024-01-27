import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { ErrorMessage } from "../../../common/enum/errormessage.enum";

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('HEALING_AREA_JWT_SECRET_KEY'),
      }); 
    } catch (error) {
      switch (error.constructor) {
        case TokenExpiredError:
          throw new UnauthorizedException([ErrorMessage.TOKEN_EXPIRED]);
        case UnauthorizedException:
          throw new UnauthorizedException([ErrorMessage.UNAUTHORIZED]);
      }
    }
    // if (request['user']['sub'] !== TokenType.ACCESS_TOKEN)
    //   throw new UnauthorizedException([ErrorMessage.BAD_TOKEN]);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
