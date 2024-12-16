import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../model/tasks';
import { User } from '../../model/user';
import { NoTasksFoundError, TaskNotFoundError } from '../../error/customError';
import { TaskDTO } from '../../dto/taskDto';
import { TaskValidator } from '../taskValidator/taskValidator';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(taskData: Task, userId: string): Promise<TaskDTO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new TaskNotFoundError('User not found');
    }

    TaskValidator.validateCreateTask({
      description: taskData.description,
      status: taskData.status,
      dueDate: taskData.dueDate,
      userId,
    });

    const task = this.taskRepository.create({
      ...taskData,
      user,
    });

    await this.taskRepository.save(task);

    return new TaskDTO(task);
  }

  async findAll(userId: string): Promise<TaskDTO[]> {
    const tasks = await this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (tasks.length === 0) {
      throw new NoTasksFoundError();
    }

    return tasks.map(task => new TaskDTO(task));
  }

  async findOneById(id: string, userId: string): Promise<TaskDTO> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });

    if (!task) {
      throw new TaskNotFoundError(id);
    }

    return new TaskDTO(task); 
  }

  async update(id: string, taskData: Partial<Task>, userId: string): Promise<TaskDTO> {
    const task = await this.findOneById(id, userId);

    if (!task) {
      throw new TaskNotFoundError(id);
    }

    TaskValidator.validateCreateTask({
      description: taskData.description ?? task.description,
      status: taskData.status ?? task.status,
      dueDate: taskData.dueDate ?? task.dueDate,
      userId,
    });

    await this.taskRepository.update(id, taskData);

    const updatedTask = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    return new TaskDTO(updatedTask);
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.findOneById(id, userId);

    if (!task) {
      throw new TaskNotFoundError(id);
    }

    await this.taskRepository.delete(id);
  }
}
