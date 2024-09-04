import { User } from "../user.entities/user.entity";

export class UserDto{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    city: string;
    picture: string;
    banner: string;
    phoneNumber: string;
    description: string;
    isAdmin: boolean;
    isOrganization: boolean;
    organizationName: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    createdAt: Date;

    constructor(user: User) {
        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.city = user.city;
        this.picture = user.picture;
        this.banner = user.banner;
        this.phoneNumber = user.phoneNumber;
        this.description = user.description;
        this.isAdmin = user.isAdmin;
        this.isOrganization = user.isOrganization;
        this.organizationName = user.organizationName;
        this.resetPasswordToken = user.resetPasswordToken;
        this.resetPasswordExpires = user.resetPasswordExpires;
        this.createdAt = user.createdAt;
    }
}