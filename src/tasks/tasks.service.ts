import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    console.log(result);
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let filteredTasks: Task[] = this.getAllTasks();
  //   if (status) {
  //     filteredTasks = filteredTasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     const normalizedSearch = search.toLowerCase();
  //     filteredTasks = filteredTasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(normalizedSearch) ||
  //         task.description.toLowerCase().includes(normalizedSearch),
  //     );
  //   }
  //   return filteredTasks;
  // }
  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  // updateTaskStatus(id: string, newStatus: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   if (task) {
  //     task.status = newStatus;
  //   }
  //   return task;
  // }
}
