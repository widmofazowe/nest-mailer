import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendEmailEvent } from 'nest-mailer-module';

import config from './config';

@Controller('/')
export class ClientController {
  constructor(@Inject('EMAIL_SERVICE') private client: ClientProxy) {}

  @Get('/send-email/:email')
  async sendCmd(@Param('email') email: string) {
    console.log('send-email');
    await this.client
      .send(
        'send-email',
        new SendEmailEvent({
          subject: 'test',
          from: config.email.from,
          text: 'test',
          to: [{ email, type: 'to' }],
        }),
      )
      .toPromise();
  }
}
