export class MissionDto {
    id: number;
    title: string;
    description: string;
    category: string;
    city: string;
    numberOfHours: number;
    deadline: Date;
    organization: any;
    picture?: string;
    volunteerNumber: number;
    pictureUrl?: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;
}