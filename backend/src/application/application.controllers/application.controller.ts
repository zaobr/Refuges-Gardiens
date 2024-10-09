import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
    Req,
    UseGuards
} from '@nestjs/common';
import { ApplicationService } from '../application.services/application.service';
import { Application } from '../application.entities/application.entity';
import { ApplicationDto } from '../applications.dto/application.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('application')
export class ApplicationController {
    constructor(
        private readonly service: ApplicationService
    ) { }

    @Get('/:id')
    getApplication(@Param('id') id: number): Promise<Application> {
        return this.service.getApplication(id);
    }

    @Get('mission/:missionId/users')
    async getMissionApplications(@Param('missionId') missionId: number) {
        const users = await this.service.getUsersByMissionId(missionId);
        return users;
    }

    @Get('user/:userId/missions')
    async getApplicationsByUserId(@Param('userId') userId: number) {
        const applications = await this.service.getApplicationsByUserId(userId);
        return applications;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() application: ApplicationDto) {
        return await this.service.saveApplication(application);        
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() application: Partial<Application>) {
        return await this.service.updateApplication(id, application);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteApplication(@Param('id') id: number) {
        this.service.deleteApplication(id);
        return 'Application erased'
    }
}