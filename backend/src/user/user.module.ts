import { Module } from '@nestjs/common';
import { UserService } from './user.services/user.service';
import { UserController } from './user.controllers/user.controller';
import { User } from './user.entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetTokenService } from 'src/auth/reset-token.service';
import { HashingService } from 'src/auth/hashing.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, ResetTokenService, HashingService],
  controllers: [UserController]
})

export class UsersModule {}
