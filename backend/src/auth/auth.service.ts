import { User } from '../user/user.entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.services/user.service';
import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly hashingService: HashingService
    ) { }

    public async validateEmail(email: string): Promise<User> {
        try {
            const user = await this.userService.getUserByEmail(email);
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
                console.error('User not found:', email);
                return { status: 404, message: 'User not found' };
            }

            console.log('Plaintext password:', password);
        console.log('Hashed password from DB:', user.hashedPassword);

            const match = await this.hashingService.comparePassword(password, user.hashedPassword);

            if (match) {
                // user found
                const payload = { email: user.email} ;
                const accessToken = this.jwtService.sign(payload);
                console.log(accessToken, payload)

                return {
                    expires_in: 3600, // 1heure
                    access_token: accessToken,
                } 
            } else {
                console.error('Password does not match for user:', email);
                return { status: 404, message: 'Incorrect password' };
            }
        } catch (error) {
            console.error('Failed to login user:', error)
            return { status: 404 };
        }

    }

    public async register(firstname: string, lastname: string, email: string, password: string): Promise<Partial<User>> {
        try {
            const existingUser = await this.userService.getUserByEmail(email);
            if (existingUser) {
                throw new Error('Email already taken')
            }
            const hashedPassword = await this.hashingService.hashPassword(password);
            console.log('Hashed Password during registration:', hashedPassword);
    
            const user = new User();
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
            user.hashedPassword = hashedPassword;

            //ce return est facultatif, il est utile pour donner des infos au client, ou les réutiliser
            //directement sans query la database, donc on peut s'en passer si nécessaire
            const savedUser = await this.userService.saveUser(user);
            return {
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                email: savedUser.email,
            }
        } catch (error) {
            console.error('Registration failed:', error.message);
            if (error.message === 'Email already taken') {
                throw error;
            }
            throw new Error('Registration failed')
        }
    }
}