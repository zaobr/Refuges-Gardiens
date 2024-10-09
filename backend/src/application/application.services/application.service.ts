import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Mission } from "src/mission/mission.entities/mission.entity";
import { User } from "src/user/user.entities/user.entity";
import { Repository } from "typeorm";
import { ApplicationDto } from "../applications.dto/application.dto";
import { Application } from "../application.entities/application.entity";


@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Mission)
        private readonly missionRepository: Repository<Mission>,
    ) { }

    async getApplication(id: number): Promise<Application> {
        const application = await this.applicationRepository
        .createQueryBuilder('application')
        .leftJoinAndSelect('application.user', 'user')
        .leftJoinAndSelect('application.mission', 'mission')
        .where('application.id = :id', { id })
        .select([
            'user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.phone_number', 'user.picture',
            'application.created_at', 'application.is_accepted'
        ])
        .getOne();

        return application
    }

    async getUsersByMissionId(missionId: number): Promise<{ applicationId: number, userId: number }[]> {
        const applications = await this.applicationRepository
        .createQueryBuilder('application')
        .innerJoinAndSelect('application.user', 'user')
        .select(['application.id', 'user.id'])
        .where('application.mission_id = :missionId', { missionId })
        .getMany();
        return applications.map(application => ({
            applicationId: application.id,
            userId: application.user.id
        }));
    }

    async getApplicationsByUserId(userId: number): Promise<{ applicationId: number, applicationStatus: boolean, missionId: number }[]> {
        const applications = await this.applicationRepository
        .createQueryBuilder('application')
        .innerJoinAndSelect('application.mission', 'mission')
        .select(['application.id', 'application.is_accepted', 'mission.id'])
        .where('application.user_id = :userId', { userId })
        .getMany();
        return applications.map(application => ({
            applicationId: application.id,
            applicationStatus: application.is_accepted,
            missionId: application.mission.id
        }))
    }

    async saveApplication(applicationDto: ApplicationDto): Promise<ApplicationDto> {
        const { user_id: user_id, mission_id: mission_id, ...applicationData } = applicationDto;

        const existingApplication = await this.applicationRepository.findOne({
            where: {
                user: { id: user_id },
                mission: { id: mission_id },
            },
        });
    
        if (existingApplication) {
            throw new Error('User has already applied for this mission');
        }

        const user = await this.userRepository.findOne({ where: { id: user_id } });
        const mission = await this.missionRepository.findOne({ where: { id: mission_id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!mission) {
            throw new NotFoundException('Mission not found');
        }

        const application = this.applicationRepository.create({
            ...applicationData,
            user, mission,
        });

        const savedApplication = await this.applicationRepository.save(application);

        return {
            application_id: savedApplication.id, 
            user_id: savedApplication.user.id,
            mission_id: savedApplication.mission.id,
            is_accepted: false
        };
    }

    async updateApplication(id: number, updateApplication: Partial<Application>): Promise<Application> {
        const application = await this.applicationRepository.findOne({ where: {id: id} });
        if (!application) {
            throw new NotFoundException(`Application with ID ${id} not found`);
        }
        const updatedApplication = { ...application, ...updateApplication };
        return this.applicationRepository.save(updatedApplication);
    }



    deleteApplication(id: number): void {
        this.applicationRepository.delete(id)
    }
}
