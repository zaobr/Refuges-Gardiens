import { IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateOrganizationDto {
    @IsInt()
    userId: number;

    @IsOptional()
    @IsBoolean()
    isVerified?: boolean;
}
