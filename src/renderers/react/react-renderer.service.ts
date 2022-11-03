import { Logger } from '@nestjs/common';
import * as juice from 'juice';
import { get, uniq } from 'lodash';
import * as ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { EmailTemplate } from '../models/template';
import { EmailRenderer } from '../renderer.service';
import ReactWrapper from './react-wrapper';

export class ReactRenderer implements EmailRenderer {
  private logger = new Logger(ReactRenderer.name);

  constructor() {}

  render(template: EmailTemplate, mergeVars?: Record<string, any>) {
    try {
      const sheet = new ServerStyleSheet();
      const componentWithStyles = sheet.collectStyles(ReactWrapper({ children: template.content }));

      const renderedWithStyles = ReactDOMServer.renderToString(componentWithStyles);
      const preparedHtml = juice(`${sheet.getStyleTags()} ${renderedWithStyles}`);
      sheet.seal();

      // this is needed to make proper coding of html comments
      // this will be used for outlook
      // styles replace is used because juice strips out extra css which can be
      // replaced with
      const htmlWithComments = preparedHtml
        .replace(/"{\'<!--[if (gte mso 9)|(IE)]>\'}"/g, "{'<!--[if (gte mso 9)|(IE)]>'}")
        .replace(/"<![endif]-->"/g, '<![endif]-->')
        .replace(/\&lt;/g, '<')
        .replace(/\&gt;/g, '>');

      // TODO: pass extra replacers

      return this.interpolateContent(htmlWithComments, mergeVars);
    } catch (e) {
      this.logger.error(e);
    }
  }

  private interpolateContent(content: string, mergeVars?: Record<string, any>) {
    if (!mergeVars) {
      return content;
    }

    const interpolationBraceRegex = /{{([\s\S]+?)}}/g;
    const matchedValues = uniq(content.match(interpolationBraceRegex));
    const interpolatedContent = matchedValues.reduce((acc, next) => {
      const key = next.replace(/{{|}}/g, '').trim();
      const valueToInterpolate = get(mergeVars, key);
      return acc.replace(new RegExp(next, 'g'), valueToInterpolate);
    }, content);

    return interpolatedContent;
  }
}
