export class TaskValidator {
    static validateCreateTask(data: { description: string; status: 'TO_DO' | 'DONE'; dueDate?: Date; userId: string }): void {
      this.validateDescription(data.description);
      this.validateStatus(data.status);
      this.validateUserId(data.userId);
      this.validateDueDate(data.dueDate); 
    }
  
    private static validateDescription(description: string): void {
      if (!description || description.trim() === '') {
        throw new Error('Description is required and cannot be empty');
      }
    }
  
    private static validateStatus(status: 'TO_DO' | 'DONE'): void {
      const validStatuses = ['TO_DO', 'DONE'];
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
      }
    }
  
    private static validateUserId(userId: string): void {
      if (!userId) {
        throw new Error('User ID is required');
      }
    }
  
    private static validateDueDate(dueDate?: Date): void {
      if (dueDate && isNaN(new Date(dueDate).getTime())) {
        throw new Error('Invalid due date');
      }
    }
  }
  