import { Module } from '@nestjs/common';
import { DisponibilityService } from './disponibility.services/disponibility.service';
import { DisponibilityController } from './disponibility.controllers/disponibility.controller';
import { Disponibility } from './disponibility.entities/disponibility.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Disponibility])],
  providers: [DisponibilityService],
  controllers: [DisponibilityController]
})

export class DisponibilitiesModule {}
