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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await this.tasksRepository.save(task);
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
  // getTaskById(id: string): Task | undefined {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return task;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
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
