import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { EmailMicroserviceModule } from './microservice.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(EmailMicroserviceModule, {
    transport: Transport.TCP,
    options: {
      port: 4000,
    },
  });
  await app.listen();
}
bootstrap();
