import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @MinLength(6)
    @IsNotEmpty()
    hashedPassword: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}