import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';  // ButtonModule'ü ekleyin
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule,CommonModule],  // ButtonModule'ü burada ekleyin
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {

  constructor(private router: Router){ }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
