import { Message } from './models/message';

export abstract class Mailer {
  abstract send(message: Message): void;
}
