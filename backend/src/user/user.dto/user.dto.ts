import { User } from "../user.entities/user.entity";

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

    constructor(user: User) {
        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.city = user.city;
        this.picture = user.picture;
        this.banner = user.banner;
        this.phone_number = user.phone_number;
        this.description = user.description;
        this.is_admin = user.is_admin;
        this.is_organization = user.is_organization;
        this.organization_name = user.organization_name;
        this.reset_password_token = user.reset_password_token;
        this.reset_password_expires = user.reset_password_expires;
        this.created_at = user.created_at;
    }
}