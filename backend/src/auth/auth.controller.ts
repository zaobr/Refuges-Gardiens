import { Controller, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { UserService } from 'src/user/user.services/user.service';
import { MailerService } from 'src/mailer/mailer.service';
import { HashingService } from './hashing.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly mailerService: MailerService,
        private readonly hashingService: HashingService,
    ) { }

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
        const { firstname, lastname, email, password } = registerDto;
        return this.authService.register(firstname, lastname, email, password);
    }

    @Post('forgot-password')
    async forgotPassword(@Body('email') email: string) { 
        const user = await this.userService.getUserByEmail(email);
        if (user) {
            const resetToken = await this.authService.setResetToken(user);

            // Return le token et le email au frontend
            return { resetToken, email: user.email };
        }
        return { message: 'If an account with that email exists, a password reset link has been sent.' };
    }

    @Post('send-reset-email')
    async sendResetEmail(@Body() { email, resetLink }: { email: string; resetLink: string }) {
        try {
            await this.mailerService.forgottenPassword({ email }, resetLink);
            return { message: 'Password reset email sent successfully.' };
        } catch (error) {
            throw new Error('Failed to send reset email');
        }
    }

    @Post('reset-password')
    async resetPassword(@Query('token') token: string, @Query('email') email: string, @Body('password') password: string) {
        const user = await this.authService.validateResetToken(token, email)

        const hashedPassword = await this.hashingService.hash(password)
        user.hashedPassword = hashedPassword

        // suppression du token
        user.resetPasswordToken = null
        user.resetPasswordExpires = null
        await this.userService.updateUser(user.id, user)

        return { message: `Password updated` }
    }
}
