import { Injectable, Logger } from '@nestjs/common';
import { Mailer } from '../mailer.service';
import { Message } from '../models/message';

@Injectable()
export class MandrillMailer implements Mailer {
  private logger = new Logger(MandrillMailer.name);

  send(message: Message) {
    this.logger.log(message, 'Sending email');
  }
}
