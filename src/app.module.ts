import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './model/user';
import { Task } from './model/tasks';
import { UserModule } from './user.module';
import { TaskModule } from './task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 1521,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      sid: process.env.DB_SID,
      entities: [User, Task],
      synchronize: true,
    }),
    UserModule,
    TaskModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir todas as origens (use com cautela)
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    }).forRoutes('*'); // Aplica o middleware para todas as rotas
  }
}
