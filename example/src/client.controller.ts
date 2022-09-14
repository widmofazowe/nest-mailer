import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Controller('/')
export class ClientController {
  constructor(@Inject('EMAIL_SERVICE') private client: ClientProxy) {}

  @Get('/send-cmd')
  async sendCmd() {
    console.log('asdf');
    await this.client.send('send-email', { subject: 'test' }).toPromise();
  }
}
