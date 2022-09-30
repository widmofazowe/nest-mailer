## Features

- Provide a way to send emails
- Provide easy to use options by default

## Installation

```bash
$ npm i --save nest-mailer
```

## Example Usage with sendgrid

Create mailer module in you application:

```
import { Global, Module } from '@nestjs/common';
import { MailerModule, SendgridMailer } from 'nest-mailer-module';
import { MailerEventEmitter } from './mailer.emitter';

@Global()
@Module({
  imports: [MailerModule.forRoot({ mailer: new SendgridMailer(/* sendgrid api key*/) })],
  providers: [MailerEventEmitter],
  exports: [MailerEventEmitter],
})
export class AppMailerModule {}
```

Then create our MailerEventEmitter

```
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SendEmailEvent, SEND_EMAIL_EVENT } from 'nest-mailer-module';

@Injectable()
export class MailerEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  emit(event: SendEmailEvent) {
    this.eventEmitter.emit(SEND_EMAIL_EVENT, new SendEmailEvent({
      from: 'from@mydomain.com',
      ...event.message,
    }));
  }
}

```

After that we should import our newly created module in app.module and we can inject it in any service since it was configured as global module with `private mailerEventEmitter: MailerEventEmitter`.

Now we can send plain emails with:

```
this.mailerEventEmitter.emit({
  subject: 'Reset Password',
  to: [{ email: 'someone@example.com', type: 'to' }],
  text: `Reset password`,
});
```

## Adding own mailer client

We can write our custom mailer by implementing interface `Mailer` and using it in mailer.module as mailer property for configuration. Here we have an example of mandrill client:

```
import { Logger } from '@nestjs/common';
import { Mandrill } from 'mandrill-api';

import { Mailer, Message } from 'nest-mailer-module';

export class MandrillMailer implements Mailer {
  private logger = new Logger(MandrillMailer.name);
  mandrillClient: any;

  constructor(mandrillApiKey: string) {
    this.mandrillClient = new Mandrill(mandrillApiKey);
    this.mandrillClient.users.ping(
      {},
      result => this.logger.log('ping "mandrill" success'),
      e => this.logger.error('ping "mandrill" failed'),
    );
  }

  send(message: Message) {
    const loggerContext = { subject: message.subject, to: message.to };
    this.logger.log(loggerContext, 'Sending email');
    return this.mandrillClient.messages.send(
      {
        message: {
          auto_text: true,
          from_email: message.from?.email,
          from_name: message.from?.name,
          html: message.html,
          important: true,
          subject: message.subject,
          to: message.to,
          text: message.text,
        },
        async: true,
      },
      () => {
        this.logger.log(loggerContext, `Mail sent`);
      },
      error => {
        this.logger.error(error, error.message);
      },
    );
  }
}
```

## Example usage with react templated emails

Let's start with creating mailer module in you application like in [first example](#example-usage-with-sendgrid)

Now we can create ReactMailerEventEmitter

```
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SendTemplatedEmailEvent, SEND_TEMPLATED_EMAIL_EVENT } from 'nest-mailer-module';

@Injectable()
export class ReactMailerEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  emit(event: SendTemplatedEmailEvent) {
    this.eventEmitter.emit(SEND_TEMPLATED_EMAIL_EVENT,
      new SendTemplatedEmailEvent(event.template, {
        from: 'from@mydomain.com',
        ...event.message,
      }, event.mergeVars),
    );
  }
}

```
