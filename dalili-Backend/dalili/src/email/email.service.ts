
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { verificationEmailTemplate } from './templates/verification-email.template.js';

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    async sendVerificationEmail(
        to: string,
        verificationUrl: string,
    ) {
        await this.transporter.sendMail({
            from: `"Dalili" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Welcome to Dalili - Verify Your Email',
            html: verificationEmailTemplate(verificationUrl),
        });
    }
}
