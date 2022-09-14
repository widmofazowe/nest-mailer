import { Module } from '@nestjs/common';
import { MandrillMailer } from './clients/mandrill.service';

@Module({ providers: [MandrillMailer] })
export class MailerModule {}
