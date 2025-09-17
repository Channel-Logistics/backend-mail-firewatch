import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
    ThrottlerModule.forRoot([
      { ttl: 60_000, limit: 20 }, 
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
