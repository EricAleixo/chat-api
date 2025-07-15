import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from "bcrypt"

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {

    this.verifyEmailExists(createUserDto);
    this.verifyNumberExists(createUserDto);

    const passwordHashed = await this.hashPassword(createUserDto.password);
    createUserDto.password = passwordHashed;

    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if(!user) {
      throw new NotFoundException("Usuário não encontrado")
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    if (updateUserDto.password) {
      const passwordHashed = await this.hashPassword(updateUserDto.password);
      updateUserDto.password = passwordHashed;
    }
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async findOneByEmail(email: string){
    return await this.userRepository.findOne({
      where: {
        email: email 
      }
    })
  }

  private async hashPassword(password: string) {
    return await hash(password, 7);
  }

  private async verifyEmailExists(createUserDto: CreateUserDto){
    const numberExists = await this.userRepository.findOne({where: {
      number: createUserDto.number
    }})

    if(numberExists){
      throw new ConflictException("Número já existente")
    }
  }

  private async verifyNumberExists(createUserDto: CreateUserDto) {
    const numberExists = await this.userRepository.findOne({where: {
      number: createUserDto.number
    }})

    if(numberExists){
      throw new ConflictException("Número já existente")
    }
  }
}
