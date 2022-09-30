import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MAILER, Mailer } from '../mailer.service';
import { SendEmailEvent, SEND_EMAIL_EVENT } from './send-email.event';

@Injectable()
export class SendEmailListener {
  private logger = new Logger(SendEmailListener.name);

  constructor(@Inject(MAILER) private mailer: Mailer) {}

  @OnEvent(SEND_EMAIL_EVENT)
  async handleEvent(event: SendEmailEvent) {
    try {
      const loggerContext = { to: event.message.to, subject: event.message.subject };
      this.logger.log(loggerContext, 'Handling send email event');
      this.mailer.send({ ...event.message });
    } catch (e) {
      this.logger.error(e, 'Error while processing send email event');
    }
  }
}
