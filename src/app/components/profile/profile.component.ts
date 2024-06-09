import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CardModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ["./profile.component.scss"],
  providers: [AuthService, MessageService]
})
export class ProfileComponent implements OnInit {
  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    occupation: ['', Validators.required],
    sifre: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUserData().subscribe(
      (user: User) => {
        this.profileForm.patchValue(user);
      },
      error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load user data' });
      }
    );
  }

  get name() {
    return this.profileForm.controls['name'];
  }

  get surname() {
    return this.profileForm.controls['surname'];
  }

  get email() {
    return this.profileForm.controls['email'];
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }

  get occupation() {
    return this.profileForm.get('occupation');
  }

  get sifre() {
    return this.profileForm.controls['sifre'];
  }

  submitDetails() {
    const formValues = this.profileForm.value;
    const postData: User = {
      name: formValues.name as string,
      surname: formValues.surname as string,
      email: formValues.email as string,
      phoneNumber: formValues.phoneNumber as string,
      occupation: formValues.occupation as string,
      sifre: formValues.sifre as string
    };
  
    this.authService.updateUser(postData).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile Updated Successfully' });
      },
      error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    );
  }
}
