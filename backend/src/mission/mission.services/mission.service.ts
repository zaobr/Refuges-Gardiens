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

    async getMissions(filters: { keyword?: string; city?: string; date?: string; organization_id?: number; excludeMissionId?: number; }, limit?: number): Promise<Mission[]> {
        const query = this.missionRepository.createQueryBuilder('mission');
        // Apply default condition
        query.andWhere('mission.isDone = :isDone', { isDone: 0 });
    
        // Conditionally apply filters
        if (filters.keyword) {
            query.andWhere('(mission.title LIKE :keyword OR mission.description LIKE :keyword)', { keyword: `%${filters.keyword}%` });
        }
    
        if (filters.city) {
            query.andWhere('mission.city = :city', { city: filters.city });
        }
    
        if (filters.date) {
            query.andWhere('mission.deadline = :date', { date: filters.date });
        }
    
        if (filters.organization_id) {
            query.andWhere('mission.organization_id = :organization_id', { organization_id: filters.organization_id });
        }
    
        if (filters.excludeMissionId) {
            query.andWhere('mission.id != :excludeMissionId', { excludeMissionId: filters.excludeMissionId });
        }
    
        // Apply limit with default value
        query.limit(limit ?? 10); // Default limit is 10 if limit is not provided
    
        // Select specific fields
        query.select(['mission.id', 'mission.title', 'mission.city', 'mission.description', 'mission.volunteerNumber', 'mission.deadline', 'mission.picture', 'mission.createdAt']);
    
        // Execute the query
        const missions = await query.getMany();
        return missions;
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
