import { Task } from "src/model/tasks";

export class TaskDTO {
    id: string;
    description: string;
    status: 'TO_DO' | 'DONE';
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    dueDate: Date;  

    constructor(task: Task) {
      this.id = task.id;
      this.description = task.description;
      this.status = task.status;
      this.userId = task.user.id;
      this.createdAt = task.createdAt;
      this.updatedAt = task.updatedAt;
      this.dueDate = task.dueDate;  
    }
}
