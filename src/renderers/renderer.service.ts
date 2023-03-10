import { EmailTemplate } from './models/template';

export abstract class EmailRenderer {
  abstract render(template: EmailTemplate, mergeVars?: Record<string, any>): string;
}
