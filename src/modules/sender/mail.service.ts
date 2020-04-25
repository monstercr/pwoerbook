import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { to } from 'await-to-js';
import * as mailer from 'nodemailer';

import { IMailTemplate } from './interfaces/mail-template.interface';
import { resetPasswordTemplate } from './templates/reset-password.mail.template';

@Injectable()
export class MailService implements OnModuleInit {
  private mailTransporter;
  private clientUrl;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const host = this.configService.get<string>('SMTP_HOST');
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASSWORD');
    this.clientUrl = this.configService.get<string>('CLIENT_URL');

    this.mailTransporter = mailer.createTransport({
      host,
      port: 587,
      secure: false,
      auth: { user, pass }
    });
  }

  async sendResetPasswordRequest(email: string, token: string): Promise<void> {
    const link = `${this.clientUrl}/reset-password/${token}`;
    const message: IMailTemplate = resetPasswordTemplate(link);
    const [err] = await to(
      new Promise((resolve, reject) =>
        this.mailTransporter.sendMail(
          {
            from: '"No Repeat" <signature-generator@iteo.com>',
            to: email,
            subject: `Reset your password <${email}>`,
            text: message.text,
            html: message.html
          },
          error => {
            error ? reject(error) : resolve();
          }
        )
      )
    );
    if (err) {
      throw new BadRequestException('Email has not be sent');
    }
  }
}
