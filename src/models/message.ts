import { Attachment } from './attachment';
import { Recipient } from './recipient';

interface MessageFrom {
  name: string;
  email: string;
}

export interface Message {
  subject: string;
  from?: MessageFrom;
  to: Recipient[];
  html?: string;
  text?: string;
  attachments?: Attachment[];
}
