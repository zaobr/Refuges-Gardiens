import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
} from '@nestjs/common';
import { Mission } from '../mission.entities/mission.entity'
import { MissionService } from '../mission.services/mission.service';
import { CreateMissionDto } from '../mission.dto/create-mission.dto';

@Controller('mission')
export class MissionController {
    constructor(
        private readonly service: MissionService
    ) { }

    @Get(':id')
    get(@Param('id') id: number): Promise<Mission> {
        return this.service.getMissionById(id);
    }

    @Post()
    create(@Body() createMissionDto: CreateMissionDto) {
        return this.service.saveMission(createMissionDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() mission: Mission) {
        return this.service.updateMission(id, mission);
    }

    @Delete(':id')
    deleteMission(@Param('id') id: number) {
        this.service.deleteMission(id);
        return 'Deletion complete'
    }
}