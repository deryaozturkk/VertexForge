import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Task } from '@models/Task';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.authService.getTask().subscribe((tasks: Task[]) => { // 'getTasks' metodu çağrılmalı
      this.tasks = tasks;
    });
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  updateTaskStatus(task: Task, status: string) {
    task.status = status;
    this.authService.updateTask(task).subscribe(updatedTask => {
      this.fetchData();
    });
  }
}
