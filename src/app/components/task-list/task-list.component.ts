import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from '../navbar/navbar.component';
import { TaskService } from '../services/task.service';
import { Task } from '../../../../backend/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CardModule, CommonModule, NavbarComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  columns = ['To Do', 'In Progress', 'Done'];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  updateTaskStatus(task: Task, status: string) {
    task.status = status;
    this.taskService.updateTask(task).subscribe(updatedTask => {
      this.fetchTasks();
    });
  }
}
