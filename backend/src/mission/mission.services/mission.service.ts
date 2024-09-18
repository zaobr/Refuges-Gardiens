import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Mission } from "../mission.entities/mission.entity";
import { Repository } from "typeorm";
import { CreateMissionDto } from "../mission.dto/create-mission.dto";
import { MissionDto } from "../mission.dto/mission.dto";
import { Organization } from "src/organization/organization.entities/organization.entity";

@Injectable()
export class MissionService {
    constructor(
        @InjectRepository(Mission)
        private readonly missionRepository: Repository<Mission>,

        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ) { }

    async getMissions(filters: { keyword?: string; city?: string; date?: string; organization_id?: number; excludeMissionId?: number; }, limit?: number): Promise<MissionDto[]> {
        const query = this.missionRepository.createQueryBuilder('mission');
        // Apply default condition
        query.andWhere('mission.is_done = :is_done', { is_done: 0 });

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
        query.select(['mission.id', 'mission.title', 'mission.city', 'mission.description', 'mission.volunteer_number', 'mission.deadline', 'mission.picture', 'mission.created_at']);

        query.select([
            'mission.id',
            'mission.title',
            'mission.city',
            'mission.description',
            'mission.volunteer_number',
            'mission.deadline',
            'mission.picture',
            'mission.created_at'
        ]);

        // Execute the query
        const missions = await query.getMany();

        // Map missions to MissionDto and include the picture URL
        const url = process.env.APP_URL;
        const port = process.env.APP_PORT;

        const missionsWithPictureUrl = missions.map(mission => {
            const missionResponse: MissionDto = {
                id: mission.id,
                title: mission.title,
                city: mission.city,
                description: mission.description,
                volunteer_number: mission.volunteer_number,
                deadline: mission.deadline,
                created_at: mission.created_at,
                category: mission.category,
                number_of_hours: mission.number_of_hours,
                organization: mission.organization,
                is_done: mission.is_done,
                updated_at: mission.updated_at
            };

            // If there's a picture, construct the URL
            if (mission.picture) {
                missionResponse.picture_url = `${url}:${port}/uploads/mission/${mission.picture}`;
            } else {
                missionResponse.picture_url = `${url}:${port}/uploads/mission/mission-default.png`;
            }

            return missionResponse;
        });

        return missionsWithPictureUrl;
    }


    async getMissionById(id: number): Promise<MissionDto> {
        const mission = await this.missionRepository.findOne({
            where: { id: id },
            relations: ['organization', 'organization.user']
        });

        const missionResponse = new MissionDto();
        missionResponse.id = mission.id;
        missionResponse.title = mission.title;
        missionResponse.description = mission.description;
        missionResponse.number_of_hours = mission.number_of_hours;
        missionResponse.deadline = mission.deadline;
        missionResponse.volunteer_number = mission.volunteer_number;
        missionResponse.category = mission.category;
        missionResponse.city = mission.city;
        missionResponse.organization = mission.organization;
        missionResponse.is_done = mission.is_done;
        missionResponse.created_at = mission.created_at;
        missionResponse.updated_at = mission.updated_at;

        const url = process.env.APP_URL;
        const port = process.env.APP_PORT;
        if (mission.picture) {
            missionResponse.picture_url = `${url}:${port}/uploads/mission/${mission.picture}`;
        } else {
            missionResponse.picture_url = `${url}:${port}/uploads/mission/mission-default.png`;
        }

        return missionResponse;
    }

    async saveMission(createMissionDto: CreateMissionDto): Promise<Mission> {
        const { organization: organizationId, ...missionData } = createMissionDto;

        const organization = await this.organizationRepository.findOne({ where: { id: organizationId } });

        if (!organization) {
            throw new Error('Organization not found');
        }

        if (!missionData.picture) {
            missionData.picture = 'mission-default.png' // à modifier si besoin
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
