import { DynamicModule, Module, Type } from '@nestjs/common';
import { MandrillMailer } from './clients/mandrill.service';
import { MAILER, SendEmailListener } from './listeners/send-email.listener';
import { Mailer } from './mailer.service';

interface ModuleProps {
  mailer: Type<Mailer>;
}

@Module({})
export class MailerModule {
  static forRoot({ mailer }: ModuleProps): DynamicModule {
    return {
      module: MailerModule,
      global: true,
      providers: [
        MandrillMailer,
        SendEmailListener,
        {
          provide: MAILER,
          useClass: mailer,
        },
      ],
    };
  }
}
