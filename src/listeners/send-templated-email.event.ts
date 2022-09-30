import { NoContentMessage } from '../models/message';
import { EmailTemplate } from '../renderers/models/template';

export class SendTemplatedEmailEvent {
  constructor(
    public template: EmailTemplate,
    public message: NoContentMessage,
    public mergeVars?: Record<string, any>,
  ) {}
}

export const SEND_TEMPLATED_EMAIL_EVENT = 'mailer.send.templated-email';
