import { Message } from '../models/message';

export interface SendEmailEvent extends Message {}

export const SEND_EMAIL_EVENT = 'mailer.send.email';
