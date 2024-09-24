export class UserDto{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    city: string;
    picture: string;
    banner: string;
    phone_number: string;
    description: string;
    is_admin: boolean;
    is_organization: boolean;
    organization_name: string;
    reset_password_token: string;
    reset_password_expires: Date;
    created_at: Date;
    picture_url?: string;
    banner_url?: string;
}