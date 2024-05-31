import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; // ButtonModule'ü ekleyin
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; // DragDropModule'ü ekleyin
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, FormsModule,DragDropModule], // DragDropModule'ü burada ekleyin
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  boards: string[] = [];
  showAddBoard: boolean = false;
  newBoardName: string = '';

  todo: string[] = [];
  inProgress: string[] = [];
  done: string[] = [];

  showAddTask: boolean = false;
  newTaskName: string = '';
  newTaskDescription: string = '';
  newSubTasks: string[] = [''];
  newTaskStatus: string = 'Yapılacaklar';
  taskStatuses: string[] = ['Yapılacaklar', 'Şu anda yapılanlar', 'Tamamlananlar'];

  showAddBoardDialog() {
    this.showAddBoard = true;
  }

  addBoard() {
    if (this.newBoardName.trim()) {
      this.boards.push(this.newBoardName.trim());
      this.newBoardName = '';
      this.showAddBoard = false;
    }
  }

  cancelAddBoard() {
    this.showAddBoard = false;
    this.newBoardName = '';
  }

  showAddTaskDialog() {
    this.showAddTask = true;
  }

  addTask() {
    if (this.newTaskName.trim()) {
      switch (this.newTaskStatus) {
        case 'Yapılacaklar':
          this.todo.push(this.newTaskName.trim());
          break;
        case 'Şu anda yapılanlar':
          this.inProgress.push(this.newTaskName.trim());
          break;
        case 'Tamamlananlar':
          this.done.push(this.newTaskName.trim());
          break;
      }
      this.newTaskName = '';
      this.newTaskDescription = '';
      this.newSubTasks = [''];
      this.newTaskStatus = 'Yapılacaklar';
      this.showAddTask = false;
    }
  }

  cancelAddTask() {
    this.showAddTask = false;
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newSubTasks = [''];
    this.newTaskStatus = 'Yapılacaklar';
  }

  addSubTask() {
    this.newSubTasks.push('');
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


}