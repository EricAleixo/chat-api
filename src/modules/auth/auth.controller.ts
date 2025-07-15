import { Controller, Get, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/signup.dto';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.login(createAuthDto);
  }

  @Post('/signup')
  async signup(@Body() user: User){
    return await this.authService.signup(user);
  }
}
