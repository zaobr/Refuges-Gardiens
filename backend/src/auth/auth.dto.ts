export class LoginDto {
    email: string;
    password: string;
}

export class RegisterDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    organization_name?: string;
    is_organization?: boolean;
}
