import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,ToastModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.scss"],
  providers: [MessageService]
})
export class AppComponent {
  title = 'bitirme';
}
