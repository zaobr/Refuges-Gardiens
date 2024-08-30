import { IsDateString, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'

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
    
    @IsDateString()
    @IsNotEmpty()
    deadline: Date;

    @IsNotEmpty()
    @IsNumber()
    organization: number; //organization id

    @IsOptional()
    @IsString()
    picture?: string; 
}