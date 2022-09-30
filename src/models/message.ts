import { Attachment } from './attachment';
import { Recipient } from './recipient';

interface MessageFrom {
  name: string;
  email: string;
}

export interface NoContentMessage {
  subject: string;
  from?: MessageFrom;
  to: Recipient[];
  attachments?: Attachment[];
}

export interface Message extends NoContentMessage {
  html?: string;
  text?: string;
}
