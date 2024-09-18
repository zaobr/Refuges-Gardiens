import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @MinLength(6)
    @IsNotEmpty()
    hashed_password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    organization_name: string;

    @IsBoolean()
    @IsOptional()
    is_organization: boolean;
}