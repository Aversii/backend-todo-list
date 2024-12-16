import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { TaskService } from '../service/taskService/task.service';
import { JwtService } from '@nestjs/jwt';
import { CustomError } from '../error/customError';
import { Task } from '../model/tasks';
import { TaskDTO } from '../dto/taskDto';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly jwtService: JwtService,
  ) {}

  private getUserIdFromAuthToken(authHeader: string): string {
    if (!authHeader) {
      throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(token); 
      return decodedToken.sub;
    } catch {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post()
  async createTask(@Body() taskData: Task, @Headers('Authorization') authHeader: string): Promise<TaskDTO> {
    try {
      const userId = this.getUserIdFromAuthToken(authHeader); 
      return await this.taskService.create(taskData, userId);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException(`Internal Server Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllTasks(@Headers('Authorization') authHeader: string): Promise<TaskDTO[]> {
    try {
      const userId = this.getUserIdFromAuthToken(authHeader) as string;
      return await this.taskService.findAll(userId);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException(`Internal Server Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string, @Headers('Authorization') authHeader: string): Promise<TaskDTO> {
    try {
      const userId = this.getUserIdFromAuthToken(authHeader);
      return await this.taskService.findOneById(id, userId);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException(`Internal Server Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: Partial<Task>,
    @Headers('Authorization') authHeader: string,
  ): Promise<TaskDTO> {
    try {
      const userId = this.getUserIdFromAuthToken(authHeader);
      return await this.taskService.update(id, taskData, userId);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException(`Internal Server Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Headers('Authorization') authHeader: string): Promise<void> {
    try {
      const userId = this.getUserIdFromAuthToken(authHeader);
      return await this.taskService.remove(id, userId);
    } catch (error) {
      if (error instanceof CustomError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new HttpException(`Internal Server Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
