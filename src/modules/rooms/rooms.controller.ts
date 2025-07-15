import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('rooms')
@UseGuards(AuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @Req() request: any) {
    const user: User = request.user
    return this.roomsService.create(createRoomDto, user);
  }

  
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }
  
  @Get('list')
  findListRooms(@Req() request: any) {
    const user: User = request.user;
    return this.roomsService.listRooms(user);
  }
  
  @Post(':idRoom/user/:idUser')
  sendConvite(
    @Param('idRoom') idRoom: number,
    @Param('idUser') idUserToInvite: number,
    @Req() request: any
  ){
    const userAdmin: User = request.user;
    return this.roomsService.sendConvite(idRoom, idUserToInvite, userAdmin);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateRoomDto: UpdateRoomDto,
    @Req() request: any
  ) {
    const user: User = request.user;
    return this.roomsService.update(+id, updateRoomDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
