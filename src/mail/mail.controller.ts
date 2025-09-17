import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { SendEmailDto } from './dto/send-email.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Throttle({ default: { ttl: 60_000, limit: 5 } })
    @Post('send')
    async send(@Body() dto: SendEmailDto) {
        return this.mailService.send(dto);
    }
}
