import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure o CORS aqui
  app.use(cors({
    origin: '*', // Permitir acesso de qualquer origem
    credentials: true, // Permite envio de cookies entre domínios
  }));
  config();
  await app.listen(3030);
}
bootstrap();
