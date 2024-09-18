export class MissionDto {
    id: number;
    title: string;
    description: string;
    category: string;
    city: string;
    number_of_hours: number;
    deadline: Date;
    organization: any;
    picture?: string;
    volunteer_number: number;
    picture_url?: string;
    is_done: boolean;
    created_at: Date;
    updated_at: Date;
}