import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class MailService {
  private readonly from: string;

  constructor(
    @Inject('MAIL_TRANSPORT') private readonly transport: Transporter,
    private readonly config: ConfigService,
  ) {
    this.from = this.config.get('SMTP_FROM') ?? this.config.get('SMTP_USER')!;
  }

  async send(dto: SendEmailDto) {
    const info = await this.transport.sendMail({
      from: this.from,
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
      html: dto.html,
      replyTo: dto.replyTo,
    });
    return { messageId: info.messageId, accepted: info.accepted, rejected: info.rejected };
  }
}
