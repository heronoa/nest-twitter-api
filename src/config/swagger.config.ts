import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Twitter  API')
  .setDescription('Twiiter middleware API')
  .setVersion('0.1')
  .build();
