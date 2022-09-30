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
  constructor(private components: Record<string, any>) {}

  render(template: EmailTemplate, mergeVars?: Record<string, any>) {
    try {
      const sheet = new ServerStyleSheet();
      const componentWithStyles = sheet.collectStyles(
        ReactWrapper({ children: template.body.map(el => this.components[el.component]({ ...el })) }),
      );

      const renderedWithStyles = ReactDOMServer.renderToString(componentWithStyles);
      const preparedHtml = juice(`${sheet.getStyleTags()} ${renderedWithStyles}`);
      sheet.seal();
      return this.interpolateContent(preparedHtml, mergeVars);
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
