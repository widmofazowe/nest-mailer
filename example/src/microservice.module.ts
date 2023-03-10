import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailMicroserviceController } from './microservice.controller';
import { MailerModule, ReactRenderer, SendgridMailer } from 'nest-mailer-module';

import config from './config';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MailerModule.forRoot({ renderer: new ReactRenderer(), mailer: new SendgridMailer(config.sendgrid.key) }),
  ],
  controllers: [EmailMicroserviceController],
})
export class EmailMicroserviceModule {}
