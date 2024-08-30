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

@Controller('organization')
export class OrganizationController {
    constructor(
        private service: OrganizationService
    ) { }

    @Get(':id')  // id de l'user en param => donne la table orga
    get(@Param('id') userId: number): Promise<Organization> {
        return this.service.getOrganizationId(userId)
    }

    @Get('/verified')
    async getVerifiedOrganization(): Promise<Organization[]> {
        return this.service.getVerifiedOrganization();
    }

    @Post()
    create(@Body() createOrganizationDto: CreateOrganizationDto) {
        return this.service.saveOrganization(createOrganizationDto);
    }

    @Put(':id')
    update(@Param('id') id:number, @Body() organization: Organization) {
        return this.service.updateOrganization(id, organization);
    }

    @Delete(':id')
    deleteOrganization(@Param('id') id: number) {
        this.service.deleteOrganization(id);
        return 'Deletion complete'
    }
}