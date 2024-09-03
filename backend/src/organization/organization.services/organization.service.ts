import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "../organization.entities/organization.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entities/user.entity";
import { CreateOrganizationDto } from "../organization.dto/create-organization.dto";
import { OrganizationDto } from "../organization.dto/organization.dto";

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getOrganizationId(user_id: number): Promise<OrganizationDto> {
        const organization = await this.organizationRepository
            .findOne({
                where: {
                    user: {
                        id: user_id
                    }
                }
            }
            );

        if (!organization) {
            return undefined;
        }

        const organizationDto: OrganizationDto = {
            id: organization.id,
            isVerified: organization.isVerified
        };

        return organizationDto;
    }

    async getVerifiedOrganization(): Promise<Organization[]> {
        const organizations = await this.organizationRepository
            .find({
                select: ['id', 'createdAt'],
                where: {isVerified: true}
            });
        return organizations
    }

    async saveOrganization(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
        const { userId, isVerified } = createOrganizationDto;

        const user = await this.organizationRepository.manager.findOne(User, { where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        const organization = this.organizationRepository.create({
            user,
            isVerified: isVerified ?? false, // Default to false if not provided
        });

        return await this.organizationRepository.save(organization);
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