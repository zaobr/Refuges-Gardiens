import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DisponibilitiesModule } from './disponibility/disponibility.module';
import { OrganizationModule } from './organization/organization.module';
import { MissionModule } from './mission/mission.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
      })],
      useFactory: () => databaseConfig,
    }),
    UsersModule,
    AuthModule,
    DisponibilitiesModule,
    MissionModule,
    OrganizationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
