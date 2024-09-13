import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailerService {
    private transport;

    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: parseInt(process.env.MAILTRAP_PORT, 10), // Parse port as integer
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });
    }
    
    async forgottenPassword(user: { email: string }, resetLink: string) {
        try {
            const info = await this.transport.sendMail({
                from: '"Refuges & Gardiens" <815de9135c5d63>',
                to: user.email,
                subject: 'Réinitialisation du mot de passe',
                text: `Cliquez sur ce lien pour réinitialiser votre mot de passe: ${resetLink} (Valable 1h)`,
                html: `<p>Cliquez sur ce lien pour réinitialiser votre mot de passe: <a href="${resetLink}">Réinitialiser le mot de passe</a> (Valable 1h)</p>`
            });
            return info;
        } catch (error) {
            console.error('Error sending email: ', error);
            throw error;
        }
    }
}
