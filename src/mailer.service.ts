import { Message } from './models/message';

export const MAILER = Symbol('MAILER');

export interface Mailer {
  send(message: Message);
}
