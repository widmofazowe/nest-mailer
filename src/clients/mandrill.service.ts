import { Logger } from '@nestjs/common';
import { Mandrill } from 'mandrill-api';

import { Mailer } from '../mailer.service';
import { Message } from '../models/message';

export class MandrillMailer implements Mailer {
  private logger = new Logger(MandrillMailer.name);
  mandrillClient: any;

  constructor(mandrillApiKey: string) {
    this.mandrillClient = new Mandrill(mandrillApiKey);
    this.mandrillClient.users.ping(
      {},
      result => this.logger.log('ping "mandrill" success'),
      e => this.logger.error('ping "mandrill" failed'),
    );
  }

  send(message: Message) {
    const loggerContext = { subject: message.subject, to: message.to };
    this.logger.log(loggerContext, 'Sending email');
    return this.mandrillClient.messages.send(
      {
        message: {
          auto_text: true,
          from_email: message.from?.email,
          from_name: message.from?.name,
          html: message.html,
          important: true,
          subject: message.subject,
          to: message.to,
          text: message.text,
        },
        async: true,
      },
      () => {
        this.logger.log(loggerContext, `Mail sent`);
      },
      error => {
        this.logger.error(error, error.message);
      },
    );
  }
}
