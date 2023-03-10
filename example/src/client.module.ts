import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';

import { ClientController } from './client.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.TCP,
        options: { port: 4000 },
      },
    ]),
  ],
  controllers: [ClientController],
})
export class ClientModule {}
