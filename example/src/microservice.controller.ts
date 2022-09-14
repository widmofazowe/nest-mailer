import { Controller } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessagePattern } from '@nestjs/microservices';
import { SendEmailEvent, SEND_EMAIL_EVENT } from 'nest-mailer-module';

@Controller()
export class EmailMicroserviceController {
  constructor(private eventEmitter: EventEmitter2) {}

  @MessagePattern('send-email')
  sendEmail(message: SendEmailEvent) {
    console.log(message);
    this.eventEmitter.emit(SEND_EMAIL_EVENT, message);
  }
}
