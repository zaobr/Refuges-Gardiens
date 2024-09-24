import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
    Query,
    Req,
    ForbiddenException,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { unlinkSync, existsSync } from 'fs';
import { Mission } from '../mission.entities/mission.entity'
import { MissionService } from '../mission.services/mission.service';
import { CreateMissionDto } from '../mission.dto/create-mission.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/user/user.entities/user.entity';
import { MissionDto } from '../mission.dto/mission.dto';

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
    ): Promise<MissionDto[]> {
        return this.service.getMissions({ keyword, city, date, excludeMissionId, organization_id });
    }

    @Get(':id')
    get(@Param('id') id: number): Promise<MissionDto> {
        return this.service.getMissionById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UseInterceptors(FileInterceptor(
        'picture', {
        storage: diskStorage({
            destination: './uploads/mission',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExt = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
            },
        }),
    }))

    async create(@Body() mission: CreateMissionDto, @UploadedFile() file: Express.Multer.File) {
        // If a file was uploaded, update the DTO with the file information
        if (file) {
            mission.picture = file.filename;
        }

        const newMission = await this.service.saveMission(mission);
        return {
            message: 'Mission created',
            id: newMission.id
        }
    }


    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @UseInterceptors(FileInterceptor(
        'picture', {
        storage: diskStorage({
            destination: './uploads/mission',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExt = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
            },
        }),
    }))

    async update(@Param('id') id: number, @Body() mission: any, @Req() request: Request, @UploadedFile() file: Express.Multer.File) {

        // vérification de l'identité de l'user faisant la requête
        let user: Partial<User> = request.user; // Récupère l'id de l'utilisateur de la request
        let userMission: number = Number(mission.organizationUserId[0]); // Récupère l'id de l'utilisateur de la mission

        if (user.id !== userMission) {
            throw new ForbiddenException("You don't have permission to update this mission")
        }
        const existingMission = await this.service.getMissionById(id)
        // Delete the old picture if a new one is uploaded
        if (file) {
            // If a new picture is uploaded, delete the old one if it's not default
            if (existingMission.picture && existingMission.picture !== 'mission-default.png' && existsSync(`./uploads/mission/${existingMission.picture}`)) {
                unlinkSync(`./uploads/mission/${existingMission.picture}`);
            }
            mission.picture = file.filename; // Save new picture filename
           
        } else if (mission.picture === 'null') {
            // If the user chose to delete the picture, delete the old one and set to null
            if (existingMission.picture && existingMission.picture !== 'mission-default.png' && existsSync(`./uploads/mission/${existingMission.picture}`)) {
                unlinkSync(`./uploads/mission/${existingMission.picture}`);
            }
            mission.picture = null; // Picture removed
            
        } else {
            // Keep the existing picture if no new file is uploaded and no deletion requested
            mission.picture = existingMission.picture; // Retain the current picture
        }


        return await this.service.updateMission(id, mission);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteMission(@Param('id') id: number) {
        this.service.deleteMission(id);
        return 'Deletion complete'
    }
}