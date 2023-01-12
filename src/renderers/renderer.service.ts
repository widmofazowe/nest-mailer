import { EmailTemplate } from './models/template';

export const RENDERER = Symbol('RENDERER');

export interface EmailRenderer {
  render(template: EmailTemplate, mergeVars?: Record<string, any>): string;
}
