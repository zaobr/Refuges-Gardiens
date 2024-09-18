import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly firstname?: string;

    @IsOptional()
    @IsString()
    readonly lastname?: string;

    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsString()
    readonly city?: string;

    @IsOptional()
    @IsString()
    picture?: string;

    @IsOptional()
    @IsString()
    banner?: string;

    @IsOptional()
    @IsString()
    readonly phone_number?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsOptional()
    @IsBoolean()
    readonly is_admin?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly is_organization?: boolean;

    @IsOptional()
    @IsString()
    readonly organization_name?: string;
}
