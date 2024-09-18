import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards
} from '@nestjs/common';
import { Disponibility } from "../disponibility.entities/disponibility.entity";
import { DisponibilityService } from "../disponibility.services/disponibility.service";
//import { AuthGuard } from '@nestjs/passport';

@Controller('disponibility')
export class DisponibilityController {
  constructor(private service: DisponibilityService) {}


  @Get(':id')
  get(@Param('id') id: number): Promise<Disponibility[]> {
    return this.service.getDisponibility(id);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  async getDisponibilities(): Promise<Disponibility[]> {
    return this.service.getDisponibilities();
  }

  @Post()
  create(@Body() disponibility: Disponibility) {
    return this.service.saveDisponibility(disponibility);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() disponibility: Disponibility) {
    return this.service.updateDisponibility(id, disponibility);
  }

  @Delete(':id')
  deleteDisponibility(@Param('id') id: number, @Body() disponibility: Disponibility) {
   return this.service.deleteDisponibility(id, disponibility);
  }

}
