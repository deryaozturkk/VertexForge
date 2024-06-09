import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { Task } from '../../interfaces/auth';

interface Board {
  id?: number;
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
  imports: [CardModule, ButtonModule, CommonModule, FormsModule, DragDropModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"],
  providers: [MessageService, AuthService]
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
  newListId: string[] = [''];
  newTaskStatus: string = 'Yapılacaklar';
  taskStatuses: string[] = ['Yapılacaklar', 'Şu anda yapılanlar', 'Tamamlananlar'];

  editTaskName: string = '';
  editTaskDescription: string = '';
  editListId: string[] = [];
  editTaskStatus: string = 'Yapılacaklar';
  selectedTask: Task | null = null;

  constructor(private authService: AuthService, private msgService: MessageService, private router: Router) {}

  showAddBoardDialog() {
    this.showAddBoard = true;
  }

  addBoard() {
    if (this.newBoardName.trim()) {
      const newBoard = {
        boardId: this.selectedBoard ? this.selectedBoard.id ?? 0 : 0,
        title: this.newBoardName.trim(),
      };

      this.authService.createList(newBoard).subscribe(
        (response: any) => {
          if (response.list) {
            const createdBoard: Board = {
              id: response.list.id,
              name: response.list.title,
              tasks: { todo: [], inProgress: [], done: [] }
            };
            this.boards.push(createdBoard);
            this.newBoardName = '';
            this.showAddBoard = false;
            this.selectBoard(createdBoard);
            this.msgService.add({ severity: 'success', summary: 'Başarılı', detail: 'Tahta başarıyla oluşturuldu' });
          } else {
            this.msgService.add({ severity: 'error', summary: 'Hata', detail: 'Tahta oluşturulamadı' });
          }
        },
        error => {
          this.msgService.add({ severity: 'error', summary: 'Hata', detail: 'Bir şeyler yanlış gitti' });
        }
      );
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
        title: this.newTaskName.trim(),
        description: this.newTaskDescription,
        listId: this.newListId.filter(listId => listId.trim() !== ''),
        taskStatuses: this.newTaskStatus
      };

      this.authService.createTask(newTask).subscribe(
        (response: Task) => {
          if (this.selectedBoard) {
            switch (this.newTaskStatus) {
              case 'Yapılacaklar':
                this.selectedBoard.tasks.todo.push(response);
                break;
              case 'Şu anda yapılanlar':
                this.selectedBoard.tasks.inProgress.push(response);
                break;
              case 'Tamamlananlar':
                this.selectedBoard.tasks.done.push(response);
                break;
            }
            this.resetTaskForm();
            this.msgService.add({ severity: 'success', summary: 'Başarılı', detail: 'Görev başarıyla eklendi' });
          }
        },
        error => {
          this.msgService.add({ severity: 'error', summary: 'Hata', detail: 'Görev eklenirken bir hata oluştu' });
        }
      );
    }
  }

  cancelAddTask() {
    this.resetTaskForm();
  }

  resetTaskForm() {
    this.showAddTask = false;
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newListId = [''];
    this.newTaskStatus = 'Yapılacaklar';
  }

  addSubTask() {
    this.newListId.push('');
  }

  editTask(task: Task) {
    this.selectedTask = task;
    this.editTaskName = task.title;
    this.editTaskDescription = task.description;
    this.editListId = [...task.listId];
    this.editTaskStatus = task.taskStatuses;
    this.showEditTask = true;
  }

  updateTask() {
    if (this.selectedTask) {
      this.authService.updateTask(this.selectedTask).subscribe(
        (response: Task) => {
          this.selectedTask!.title = this.editTaskName;
          this.selectedTask!.description = this.editTaskDescription;
          this.selectedTask!.listId = this.editListId.filter(listId => listId.trim() !== '');
          this.selectedTask!.taskStatuses = this.editTaskStatus;
          this.showEditTask = false;
          this.msgService.add({ severity: 'success', summary: 'Başarılı', detail: 'Görev başarıyla güncellendi' });
        },
        error => {
          this.msgService.add({ severity: 'error', summary: 'Hata', detail: 'Görev güncellenirken bir hata oluştu' });
        }
      );
    }
  }

  cancelEditTask() {
    this.showEditTask = false;
  }

  addEditSubTask() {
    this.editListId.push('');
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
