import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Mailer } from '../mailer.service';
import { SendEmailEvent } from './send-email.event';

export const MAILER = Symbol('MAILER');

export const SEND_EMAIL_EVENT = 'mailer.send.email';

@Injectable()
export class SendEmailListener {
  private logger = new Logger(SendEmailListener.name);

  constructor(@Inject(MAILER) private mailer: Mailer) {}

  @OnEvent(SEND_EMAIL_EVENT)
  async handleEvent(event: SendEmailEvent) {
    try {
      this.logger.log(event, 'Handling send email event');
      this.mailer.send({ ...event });
    } catch (e) {
      this.logger.error(e, 'Error while processing send email event');
    }
  }
}
