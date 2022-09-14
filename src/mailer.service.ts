import { Message } from './models/message';

export interface Mailer {
  send(message: Message);
}
