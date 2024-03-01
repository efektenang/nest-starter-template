import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(req)

        if (!token) throw new UnauthorizedException()

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.SECRET_KEY
            })
            req['user'] = payload
        } catch (err: any) {
            throw new Error(err.message)
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}