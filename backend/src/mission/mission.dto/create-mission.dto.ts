import { IsDateString, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'
import { Type } from 'class-transformer';

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
    @Type(() => Number)
    numberOfHours: number;
    
    @IsDateString()
    @IsNotEmpty()
    deadline: Date;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    organization: number; //organization id

    @IsOptional()
    picture?: string; 

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    volunteerNumber: number;
}