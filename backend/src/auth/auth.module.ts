import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HashingService } from './hashing.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.services/user.service';
import { User } from 'src/user/user.entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { ResetTokenService } from './reset-token.service';
import { MailerService } from 'src/mailer/mailer.service';
import { OrganizationService } from 'src/organization/organization.services/organization.service';
import { Organization } from 'src/organization/organization.entities/organization.entity';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Organization])
  ],
  providers: [HashingService, AuthService, UserService, JwtStrategy, ResetTokenService, MailerService, OrganizationService],
  controllers: [AuthController],
  exports: [HashingService],
})
export class AuthModule {}
