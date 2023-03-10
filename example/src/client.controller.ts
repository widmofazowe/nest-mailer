import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/')
export class ClientController {
  constructor(@Inject('EMAIL_SERVICE') private client: ClientProxy) {}

  @Get('/send-cmd')
  async sendCmd() {
    console.log('send-email');
    await this.client.send('send-email', { subject: 'test' }).toPromise();
  }
}
