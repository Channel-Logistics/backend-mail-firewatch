import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class SendEmailDto {
@IsEmail()
from: string;

  @IsEmail()
  to: string;

  @IsOptional()
  @IsEmail()
  replyTo?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  subject: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  html?: string;
}
