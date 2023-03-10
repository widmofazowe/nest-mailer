import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EmailRenderer } from '../renderers/renderer.service';
import { SendEmailEvent, SEND_EMAIL_EVENT } from './send-email.event';
import { SendTemplatedEmailEvent, SEND_TEMPLATED_EMAIL_EVENT } from './send-templated-email.event';

@Injectable()
export class SendTemplateEmailListener {
  private logger = new Logger(SendTemplateEmailListener.name);

  constructor(private eventEmitter: EventEmitter2, private renderer: EmailRenderer) {}

  @OnEvent(SEND_TEMPLATED_EMAIL_EVENT)
  async handleEvent(event: SendTemplatedEmailEvent) {
    const loggerContext = { ...event.message };
    try {
      this.logger.log(loggerContext, 'Handling send template email event');
      this.logger.log(loggerContext, 'Rendering email');
      const html = this.renderer.render(event.template, event.mergeVars);
      this.logger.log(loggerContext, 'Sending email');
      this.eventEmitter.emit(SEND_EMAIL_EVENT, new SendEmailEvent({ ...event.message, html }));
    } catch (e) {
      this.logger.error(e, 'Error while processing send template email event');
    }
  }
}
