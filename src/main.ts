import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS
  app.enableCors({
    origin: '*', // Ou liste os domínios permitidos: ['https://frontend.com']
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Incluir o método OPTIONS
    allowedHeaders: 'Content-Type,Authorization', // Incluir os cabeçalhos necessários
    credentials: true, // Habilite se for necessário enviar cookies
  });

  await app.listen(3000);
}
bootstrap();
