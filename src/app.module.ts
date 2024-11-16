import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';  // Para ler variáveis de ambiente
import { User } from './model/user';
import { UserModule } from './user.module';
import { Task } from './model/tasks';
import { TaskModule } from './task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Torna as variáveis de ambiente acessíveis globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'oracle',  // Define o tipo como 'oracle'
      host: process.env.DB_HOST,  // Endereço do banco de dados
      port: parseInt(process.env.DB_PORT, 10),  // Porta do banco de dados
      username: process.env.DB_USER,  // Usuário do banco de dados
      password: process.env.DB_PASSWORD,  // Senha do banco de dados
      sid: process.env.DB_SID,  // SID do banco Oracle
      entities: [User,Task],  // Defina as entidades do TypeORM
      synchronize: true,  // Sincroniza automaticamente as entidades com o banco de dados (use com cautela em produção)
    }),
    UserModule, TaskModule // Registra o módulo User
  ],
})
export class AppModule {}
