import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
} from '@nestjs/common';
import { OrganizationService } from '../organization.services/organization.service';
import { Organization } from '../organization.entities/organization.entity';
import { CreateOrganizationDto } from '../organization.dto/create-organization.dto';
import { OrganizationDto } from '../organization.dto/organization.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('organization')
export class OrganizationController {
    constructor(
        private service: OrganizationService
    ) { }

    @Get('verified')
    getVerifiedOrganization(): Promise<Organization[]> {
        return this.service.getVerifiedOrganization();
    }

    @Get(':id')  // id de l'user en param => donne la table orga
    get(@Param('id') userId: number): Promise<OrganizationDto> {
        return this.service.getOrganizationId(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createOrganizationDto: CreateOrganizationDto) {
        return this.service.saveOrganization(createOrganizationDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id:number, @Body() organization: Organization) {
        return this.service.updateOrganization(id, organization);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteOrganization(@Param('id') id: number) {
        this.service.deleteOrganization(id);
        return 'Deletion complete'
    }
}