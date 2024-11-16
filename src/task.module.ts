import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TaskController } from './controller/taskController';
import { TaskService } from './service/taskService/task.service';
import { Task } from './model/tasks';
import { UserModule } from './user.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), 
    UserModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '24h' }, 
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TypeOrmModule],

})
export class TaskModule {}
