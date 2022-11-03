import { DynamicModule, Module } from '@nestjs/common';
import { SendEmailListener } from './listeners/send-email.listener';
import { SendTemplateEmailListener } from './listeners/send-templated-email.listener';
import { MAILER, Mailer } from './mailer.service';
import { EmailRenderer, RENDERER } from './renderers/renderer.service';

interface ModuleProps {
  mailer: Mailer;
  renderer?: EmailRenderer;
}

@Module({})
export class MailerModule {
  static forRoot({ mailer, renderer }: ModuleProps): DynamicModule {
    const exportedServices = [
      {
        provide: MAILER,
        useValue: mailer,
      },
      {
        provide: RENDERER,
        useValue: renderer,
      },
    ];

    return {
      module: MailerModule,
      global: true,
      providers: [SendEmailListener, SendTemplateEmailListener, ...exportedServices],
      exports: exportedServices,
    };
  }
}
