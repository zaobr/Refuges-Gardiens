import { Module } from '@nestjs/common';
import { UserService } from './user.services/user.service';
import { UserController } from './user.controllers/user.controller';
import { User } from './user.entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserService],
  controllers: [UserController]
})
export class UsersModule {}
