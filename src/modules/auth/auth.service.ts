import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/signup.dto';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(createAuth: CreateAuthDto){

    const user = await this.usersService.findOneByEmail(createAuth.email);

    if(!user){
      throw new NotFoundException("Usuário não encontrado.")
    }

    const result = await compare(createAuth.password, user.password);

    if(!result){
      throw new UnauthorizedException("Senha não congruentes");
    }

    const payload = {
      sub: user.id,
      email: user.email,
      number: user.number
    }

    return {
      acess_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>("SECRET_JWT")
      })
    }

  }

  async signup(createAuth: CreateAuthDto){
    return await this.usersService.create(createAuth);
  }

}
