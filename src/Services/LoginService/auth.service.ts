import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: Partial<User>) {
    this.http.post("http://localhost:3000/api/auth/login",
      {
        email: user.email,
        password: user.password
      }).subscribe({
        next: (response: Partial<User>) => {
          sessionStorage.setItem('token', response.token? response.token : ''); 
          localStorage.setItem('userId', JSON.stringify(response.userId));
          localStorage.setItem('role', JSON.stringify(response.role));
          console.log("Login was succeed", response);
        },
        error: (error) => {
          console.log('Error occurred:', error); // טיפול בשגיאות
        }
      })
  }

  signUp(user:Partial<User>){
    this.http.post("http://localhost:3000/api/auth/register",
      {
        name:user.name,
        email: user.email,
        password: user.password,
        role:user.role
      }).subscribe({
        next: (response:Partial<User>) => {
          sessionStorage.setItem('token', response.token? response.token : ''); 
          localStorage.setItem('userId', JSON.stringify(response.userId));
          localStorage.setItem('role', JSON.stringify(response.role));
        },
        error: (error) => {
          console.error('Error occurred:', error); // טיפול בשגיאות
        }
      })
  }

  logout(){
    sessionStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  
}
