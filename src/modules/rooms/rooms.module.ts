import { forwardRef, Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    UsersModule,
    AuthModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule { }
