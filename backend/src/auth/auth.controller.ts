import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body() LoginDto: LoginDto): Promise<any> {
        const { email, password } = LoginDto;
        const result = await this.authService.login(email, password);

        if (result.status && result.status === 404) {
            return {
                statusCode: 404,
                message: result.message || 'Login failed',
            };
        }

        return {
            statusCode: 200,
            data: result,
        };
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        const {firstname, lastname, email, password} = registerDto;
      return this.authService.register(firstname, lastname, email, password);
    }
}
