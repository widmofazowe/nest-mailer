import { Injectable } from '@nestjs/common';
import { EmailTemplate } from './models/template';
import { Renderer } from './render.service';

@Injectable()
export class ReactRenderer implements Renderer {
  render(template: EmailTemplate) {
    return '';
  }
}
