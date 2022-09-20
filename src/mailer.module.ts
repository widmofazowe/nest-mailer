import { DynamicModule, Module, Type } from '@nestjs/common';
import { MandrillMailer } from './clients/mandrill.service';
import { SendEmailListener } from './listeners/send-email.listener';
import { MAILER, Mailer } from './mailer.service';

interface ModuleProps {
  mailer: Mailer;
}

@Module({})
export class MailerModule {
  static forRoot({ mailer }: ModuleProps): DynamicModule {
    return {
      module: MailerModule,
      global: true,
      providers: [
        SendEmailListener,
        {
          provide: MAILER,
          useValue: mailer,
        },
      ],
    };
  }
}
