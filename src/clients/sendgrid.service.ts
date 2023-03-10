import { Logger } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';

import { Mailer } from '../mailer.service';
import { Message } from '../models/message';

export class SendgridMailer extends Mailer {
  private logger = new Logger(SendgridMailer.name);

  constructor(sendgridApiKey: string) {
    super();
    sendgrid.setApiKey(sendgridApiKey);
  }

  send(message: Message) {
    const loggerContext = { subject: message.subject, to: message.to };
    this.logger.log(loggerContext, 'Sending email');
    sendgrid
      .send({
        to: message.to.filter(r => r.type === 'to').map(r => r.email),
        cc: message.to.filter(r => r.type === 'cc').map(r => r.email),
        bcc: message.to.filter(r => r.type === 'bcc').map(r => r.email),
        from: message.from!,
        subject: message.subject,
        text: message.text!,
        html: message.html!,
      })
      .then(() => {
        this.logger.log(loggerContext, `Mail sent`);
      })
      .catch(error => {
        this.logger.error(error, error.message);
      });
  }
}
