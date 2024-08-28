import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateMissionDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsNotEmpty()
    numberOfHours: number;
    
    @IsNotEmpty()
    deadline: Date;

    @IsNotEmpty()
    @IsNumber()
    organization: string;
}