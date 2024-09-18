import { User } from '../user/user.entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.services/user.service';
import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { CreateUserDto } from '../user/user.dto/create-user.dto';
import { ResetTokenService } from './reset-token.service';
import { OrganizationService } from 'src/organization/organization.services/organization.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly hashingService: HashingService,
        private readonly resetTokenService: ResetTokenService,
        private readonly organizationService: OrganizationService,
    ) { }

    public async validateToken(id: number): Promise<Partial<User>> {
        try {
            const user = await this.userService.getUserById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Failed to retrieve user:', error);
            throw new Error('Validation failed');
        }
    }


    public async login(email: string, password: string): Promise<any> {
        try {
            const user = await this.userService.getUserByEmail(email);

            if (!user) {
                // User not found
                return { message: 'User not found' };
            }
            const match = await this.hashingService.compare(password, user.hashed_password);

            if (match) {
                // user found
                const payload = { id: user.id };
                const accessToken = this.jwtService.sign(payload);
                const userInfo = { userId: user.id, is_organization: user.is_organization };

                return {
                    expires_in: 3600, // 1heure
                    access_token: accessToken,
                    userInfo
                }
            } else {
                console.error('Password does not match for user:', email);
                return { message: 'Incorrect password or invalid email' };
            }
        } catch (error) {
            console.error('Failed to login user:', error)
        }
    }

    public async register(firstname: string,
        lastname: string,
        email: string,
        password: string,
        organization_name?: string,
        is_organization?: boolean
    ): Promise<Partial<User>> {
        try {
            const existingUser = await this.userService.verifyIfEmailExists(email);
            if (existingUser) {
                throw new Error('Email already taken')
            }
            const hashed_password = await this.hashingService.hash(password);

            const user = new CreateUserDto();
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
            user.hashed_password = hashed_password;
            user.organization_name = organization_name;
            user.is_organization = is_organization ?? false

            const savedUser = await this.userService.saveUser(user);

            if (is_organization && organization_name) {
                const createOrganizationDto = {
                    userId: savedUser.id,
                    is_verified: false
                };
    
                await this.organizationService.saveOrganization(createOrganizationDto);
            }
            return 
        } catch (error) {
            console.error('Registration failed:', error.message);
            if (error.message === 'Email already taken') {
                throw error;
            }
            throw new Error('Registration failed')
        }
    }

    async setResetToken(user: User): Promise<string> {

        const resetToken = await this.resetTokenService.resetTokenGenerator();

        user.reset_password_token = resetToken;
        user.reset_password_expires = new Date(Date.now() + 60 * 60 * 1000); // 1h

        await this.userService.saveUser(user);
        return resetToken;
    }

    async validateResetToken(resetToken: string, email: string): Promise<Partial<User>> {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new Error('No valid user');
        }

        if (resetToken !== user.reset_password_token) {
            throw new Error('Invalid token');
        }

        if (user.reset_password_expires < new Date()) {
            throw new Error('Expired token');
        }
        return user
    }
}