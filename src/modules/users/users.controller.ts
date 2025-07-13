import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { rolesUse } from './entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(rolesUse.admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(rolesUse.admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  seeProfile(@Req() request: any){
    return this.usersService.findOne(request.user.id);
  }

  @Get(':id')
  @Roles(rolesUse.admin)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @Put(':id')
  @Roles(rolesUse.admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(rolesUse.admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
