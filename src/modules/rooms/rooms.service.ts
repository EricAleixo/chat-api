import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly userService: UsersService
  ) { }

  async create(createRoomDto: CreateRoomDto, admin: User) {
    const room = await this.roomRepository.save(createRoomDto);

    room.users = room.users || [];
    room.admins = room.admins || [];

    room.users.push(admin);
    room.admins.push(admin);
    return await this.roomRepository.save(room);
  }

  async sendConvite(idRoom: number, idUserToInvite: number, userAdmin: User) {

    const room = await this.roomRepository.findOne({
      where: {
        id: idRoom
      },
      relations: {
        admins: true
      }
    })

    if (!room) {
      throw new NotFoundException("Sala não existente");
    }

    const listAdmin = room.admins.filter((admin) => admin.email === userAdmin.email)

    if(!listAdmin){
      throw new UnauthorizedException("Não autorizado");
    }
    const userToInvite = this.userService.findOne(idUserToInvite);

    //Criar aqui a lógica de enviar convite

    return "Convite enviado!"
  }

  async findAll() {
    return await this.roomRepository.find({ relations: { admins: true, users: true } });
  }

  async listRooms(user: User) {
    return await this.roomRepository.find({
      where: {
        users: {
          id: user.id
        }
      },
      relations: {
        admins: true,
        users: true
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto, adminUser: User) {
    const room = await this.roomRepository.findOne({
      where: {
        id: id
      },
      relations: {
        admins: true
      }
    })

    if (!room) throw new NotFoundException("Sala não encontrada");


    const listAdmin = room.admins.find((user) => user.email === adminUser.email)

    console.log(listAdmin)

    return listAdmin;

  }

  async remove(id: number) {
    return await this.roomRepository.delete(id);
  }
}
