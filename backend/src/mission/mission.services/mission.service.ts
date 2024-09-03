import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Mission } from "../mission.entities/mission.entity";
import { Repository } from "typeorm";
import { CreateMissionDto } from "../mission.dto/create-mission.dto";
import { Organization } from "src/organization/organization.entities/organization.entity";

@Injectable()
export class MissionService {
    constructor(
        @InjectRepository(Mission)
        private readonly missionRepository: Repository<Mission>,

        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) { }

    async getMissions(): Promise<Mission[]> {
        return await this.missionRepository.find({
            select: ['id', 'title', 'city']
        });
    }

    async getMissionById(id: number): Promise<Mission> {
        return await this.missionRepository.findOne({
            where: { id: id },
            relations: ['organization', 'organization.user']
        });
    }

    async saveMission(createMissionDto: CreateMissionDto): Promise<Mission> {
        const { organization: organizationId, ...missionData } = createMissionDto;

        const organization = await this.organizationRepository.findOne({ where: { id: organizationId } });

        if (!organization) {
            throw new Error('Organization not found');
        }

        const mission = this.missionRepository.create({
            ...missionData,
            organization,
        });

        return this.missionRepository.save(mission);
    }


    async updateMission(id: number, updateMission: Partial<Mission>): Promise<Mission> {
        const mission = await this.missionRepository.findOne({ where: { id: Number(id) } });
        if (!mission) {
            throw new NotFoundException(`Mission with ID ${id} not found`);
        }
        const updatedMission = { ...mission, ...updateMission };
        return this.missionRepository.save(updatedMission);
    }

    deleteMission(id: number): void {
        this.missionRepository.delete(id);
    }
}
