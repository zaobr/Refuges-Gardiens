import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body() LoginDto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<any> {
        const { email, password } = LoginDto;
        const result = await this.authService.login(email, password, res);

        if (result.status && result.status === 404) {
            return {
                statusCode: 404,
                message: result.message || 'Login failed',
            };
        }

        const accessToken = result.access_token
        res.cookie('access_token', accessToken, {
              httpOnly: true,   // Secure against XSS
              maxAge: 3600000,  // 1 hour
          });

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
