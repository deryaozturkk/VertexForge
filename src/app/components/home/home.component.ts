import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  description: string;
  subTasks: string[];
  status: string;
}

interface Board {
  name: string;
  tasks: {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, FormsModule, DragDropModule],
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  boards: Board[] = [];
  selectedBoard: Board | null = null;
  showAddBoard: boolean = false;
  newBoardName: string = '';

  showAddTask: boolean = false;
  showEditTask: boolean = false;
  newTaskName: string = '';
  newTaskDescription: string = '';
  newSubTasks: string[] = [''];
  newTaskStatus: string = 'Yapılacaklar';
  taskStatuses: string[] = ['Yapılacaklar', 'Şu anda yapılanlar', 'Tamamlananlar'];
  
  editTaskName: string = '';
  editTaskDescription: string = '';
  editSubTasks: string[] = [];
  editTaskStatus: string = 'Yapılacaklar';
  selectedTask: Task | null = null;

  showAddBoardDialog() {
    this.showAddBoard = true;
  }

  addBoard() {
    if (this.newBoardName.trim()) {
      const newBoard: Board = {
        name: this.newBoardName.trim(),
        tasks: { todo: [], inProgress: [], done: [] }
      };
      this.boards.push(newBoard);
      this.newBoardName = '';
      this.showAddBoard = false;
      this.selectBoard(newBoard);
    }
  }

  cancelAddBoard() {
    this.showAddBoard = false;
    this.newBoardName = '';
  }

  selectBoard(board: Board) {
    this.selectedBoard = board;
  }

  showAddTaskDialog() {
    this.showAddTask = true;
  }

  addTask() {
    if (this.newTaskName.trim() && this.selectedBoard) {
      const newTask: Task = {
        name: this.newTaskName.trim(),
        description: this.newTaskDescription,
        subTasks: this.newSubTasks.filter(subTask => subTask.trim() !== ''),
        status: this.newTaskStatus
      };
      switch (this.newTaskStatus) {
        case 'Yapılacaklar':
          this.selectedBoard.tasks.todo.push(newTask);
          break;
        case 'Şu anda yapılanlar':
          this.selectedBoard.tasks.inProgress.push(newTask);
          break;
        case 'Tamamlananlar':
          this.selectedBoard.tasks.done.push(newTask);
          break;
      }
      this.resetTaskForm();
    }
  }

  cancelAddTask() {
    this.resetTaskForm();
  }

  resetTaskForm() {
    this.showAddTask = false;
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newSubTasks = [''];
    this.newTaskStatus = 'Yapılacaklar';
  }

  addSubTask() {
    this.newSubTasks.push('');
  }

  editTask(task: Task) {
    this.selectedTask = task;
    this.editTaskName = task.name;
    this.editTaskDescription = task.description;
    this.editSubTasks = [...task.subTasks];
    this.editTaskStatus = task.status;
    this.showEditTask = true;
  }

  updateTask() {
    if (this.selectedTask) {
      this.selectedTask.name = this.editTaskName;
      this.selectedTask.description = this.editTaskDescription;
      this.selectedTask.subTasks = this.editSubTasks.filter(subTask => subTask.trim() !== '');
      this.selectedTask.status = this.editTaskStatus;
      this.showEditTask = false;
    }
  }

  cancelEditTask() {
    this.showEditTask = false;
  }

  addEditSubTask() {
    this.editSubTasks.push('');
  }

  drop(event: CdkDragDrop<Task[]>) {
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
