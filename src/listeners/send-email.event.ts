import { Message } from '../models/message';

export class SendEmailEvent {
  constructor(public message: Message) {}
}

export const SEND_EMAIL_EVENT = 'mailer.send.email';
