import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './model/user';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  
  }
bootstrap();
