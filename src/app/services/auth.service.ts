import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserKurumsal } from '../interfaces/auth';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/auth/register`, userDetails);
  }
  getUserByEmail(email:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  login(user:any){
    return this.http.post(`${this.baseUrl}/auth/login`,user)
  }
  
  registerkurumsalUser(userKurumsalDetails: UserKurumsal) {
    return this.http.post(`${this.baseUrl}/auth/registerkurumsal`, userKurumsalDetails);
  }
}
