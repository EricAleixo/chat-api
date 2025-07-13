import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from './config/configDB';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    TypeOrmModule.forRoot(configDB),
    ConfigModule.forRoot({
      isGlobal: true  
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
