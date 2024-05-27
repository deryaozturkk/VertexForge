import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CardModule],
  templateUrl: './task-list.component.html',
  styleUrls: ["./task-list.component.scss"]
})
export class TaskListComponent {

}
