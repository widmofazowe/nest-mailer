import { EmailTemplate } from './models/template';

export interface Renderer {
  render(template: EmailTemplate): string;
}
