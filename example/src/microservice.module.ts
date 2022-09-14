import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailMicroserviceController } from './microservice.controller';
import { MailerModule, MandrillMailer } from 'nest-mailer-module';

@Module({
  imports: [EventEmitterModule.forRoot(), MailerModule.forRoot({ mailer: MandrillMailer })],
  controllers: [EmailMicroserviceController],
})
export class EmailMicroserviceModule {}
