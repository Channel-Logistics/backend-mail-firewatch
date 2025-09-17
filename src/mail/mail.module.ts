import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [ConfigModule],
  controllers: [MailController],
  providers: [
    MailService,
    {
      provide: 'MAIL_TRANSPORT',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const transporter = nodemailer.createTransport({
          host: config.get('SMTP_HOST'),
          port: Number(config.get('SMTP_PORT') ?? 587),
          secure:
            config.get('SMTP_SECURE') === true ||
            config.get('SMTP_SECURE') === 'true',
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASS'),
          },
        });
        await transporter.verify(); // valida conexión
        return transporter;
      },
    },
  ],
  exports: ['MAIL_TRANSPORT', MailService],
})
export class MailModule {}
