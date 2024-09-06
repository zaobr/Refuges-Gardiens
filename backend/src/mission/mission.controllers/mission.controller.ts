import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
    Query
} from '@nestjs/common';
import { Mission } from '../mission.entities/mission.entity'
import { MissionService } from '../mission.services/mission.service';
import { CreateMissionDto } from '../mission.dto/create-mission.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('mission')
export class MissionController {
    constructor(
        private readonly service: MissionService
    ) { }

    @Get()
    getMissions(
        @Query('keyword') keyword?: string,
        @Query('city') city?: string,
        @Query('date') date?: string,
        @Query('excludeMissionId') excludeMissionId?: number,
        @Query('organization_id') organization_id?: number,
    ): Promise<Mission[]> {
        return this.service.getMissions({ keyword, city, date, excludeMissionId, organization_id });
    }

    @Get(':id')
    get(@Param('id') id: number): Promise<Mission> {
        return this.service.getMissionById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createMissionDto: CreateMissionDto) {
        return this.service.saveMission(createMissionDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: number, @Body() mission: Mission) {
        return this.service.updateMission(id, mission);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteMission(@Param('id') id: number) {
        this.service.deleteMission(id);
        return 'Deletion complete'
    }
}