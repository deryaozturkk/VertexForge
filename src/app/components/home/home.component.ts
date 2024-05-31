import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; // ButtonModule'ü ekleyin
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; // DragDropModule'ü ekleyin

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, DragDropModule], // DragDropModule'ü burada ekleyin
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {

  constructor(private router: Router) { }
  
  todo = [
    'Lorem ipsum dolor sit amet...',
    'Lorem ipsum dolor sit amet...',
    'Lorem ipsum dolor sit amet...',
    'Lorem ipsum dolor sit amet...'
  ];

  inProgress = [
    'Lorem ipsum dolor sit amet...',
    'Lorem ipsum dolor sit amet...'
  ];

  done = [
    'Lorem ipsum dolor sit amet...'
  ];

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

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
