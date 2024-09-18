import { IsInt, IsOptional, IsBoolean } from 'class-validator';

export class OrganizationDto {
    @IsInt()
    id: number;

    @IsOptional()
    @IsBoolean()
    is_verified?: boolean;
}