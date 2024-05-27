import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    RouterModule, 
    CommonModule,
    HttpClientModule
  
  ],
  templateUrl: './register.component.html',
  styleUrls: ["./register.component.scss"],
  providers: [AuthService, MessageService]

})
export class RegisterComponent {

  registerForm = this.fb.group({
    name : ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]], // pattern ifadesinin kapanış parantezi düzeltildi
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    occupation: ['', Validators.required],
    sifre: ['', [Validators.required]],
    confirmPassword: ['', Validators.required]
  },
  {
    validators: passwordMatchValidator
  });

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private messageService: MessageService,
    private router: Router
  ) {}
  
  get name(){
    return this.registerForm.controls['name'];
  }

  get surname() {
    return this.registerForm.controls['surname'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get phoneNumber() {
     return this.registerForm.get('phoneNumber'); 
    }

  get occupation() {
     return this.registerForm.get('occupation'); 
    }

  get password() {
    return this.registerForm.controls['sifre'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  

  submitDetails() {
    //const { confirmPassword, ...postData } = this.registerForm.value; // Destructure to exclude confirmPassword
    
    
    const postData = {...this.registerForm.value};
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register Successfully' });
        this.router.navigate(['login']);
      },
      error => {
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    );
  }

}
