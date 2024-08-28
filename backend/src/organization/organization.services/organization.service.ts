import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "../organization.entities/organization.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entities/user.entity";
import { CreateOrganizationDto } from "../organization.dto/create-organization.dto";

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) {}

    async getOrganizationId(user_id) {
        return await this.organizationRepository.findOne({
            select: ['id'],
            where: [{user: user_id}]
        });
    }

    async getVerifiedOrganization(): Promise<Organization[]> {
        return await this.organizationRepository.find({
            select: ['id', 'createdAt'], 
            where: [{isVerified: true}]
        });
    }

    async saveOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
        const { userId, isVerified } = createOrganizationDto;

        const user = await this.organizationRepository.manager.findOne(User, { where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        const organization = this.organizationRepository.create({
            user,
            isVerified: isVerified ?? false, // false par défaut
        });

        return await this.organizationRepository.save(organization)
    }

    async updateOrganization(id: number, updateOrganization: Partial<Organization>): Promise<Organization> {
        const orga = await this.organizationRepository.findOne({ where: { id: Number(id) } });
        if (!orga) {
          throw new NotFoundException(`Organization with ID ${id} not found`);
        }
        const updatedOrganization = { ...orga, ...updateOrganization };
        return this.organizationRepository.save(updatedOrganization);
      }

    deleteOrganization(id: number): void {
        this.organizationRepository.delete(id)
    }
}