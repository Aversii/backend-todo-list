import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './model/user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Certifique-se de permitir cabeçalhos necessários  
  });  await app.listen(process.env.PORT ?? 3000);
  
  }
bootstrap();
