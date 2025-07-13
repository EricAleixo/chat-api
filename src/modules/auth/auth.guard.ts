import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { rolesUse } from '../users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string | undefined;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly usersService: UsersService
  ) { 
    this.jwtSecret = this.configService.get<string>("SECRET_JWT");
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token não fornecido");
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.jwtSecret
      })

      const user = await this.usersService.findOne(payload.sub)

      if(!user) throw new UnauthorizedException("Usuário não encontrado");

      request.user = user;

      const requiredRoles = this.reflector.getAllAndOverride<rolesUse[]>("roles",[
        context.getHandler(),
        context.getClass()
      ])

      if(requiredRoles && requiredRoles.length > 0){
        const hasRoles = requiredRoles.some(role => user.role.includes(role))

        if(!hasRoles) throw new ForbiddenException("Permissão insuficiente")
      }

      return true
    } catch(e){
      throw new UnauthorizedException(e.message);
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? []
    return type === "Bearer" ? token : undefined;
  }
}
