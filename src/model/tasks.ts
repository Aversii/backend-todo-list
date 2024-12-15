import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user';

/**
 * Represents a task assigned to a user.
 */
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({
    default: 'TO_DO',
  })
  status: 'TO_DO' | 'DONE';

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE', eager: true })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  
  @Column({ nullable: true })
  dueDate: Date;

  constructor(description: string, user: User, status: 'TO_DO' | 'DONE' = 'TO_DO') {
    this.description = description;
    this.status = status;
    this.user = user;
  }

  markAsDone(): void {
    this.status = 'DONE';
  }

  markAsToDo(): void {
    this.status = 'TO_DO';
  }
}
