import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/User';
import { LoginService } from '../LoginService/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth:LoginService) { }

  deleteUserById(userId:number){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.delete("http://localhost:3000/api/users/"+userId, {headers:headers}).subscribe({
      next: () => {
        this.auth.logout();
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  getUserById(userId:number){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log("service",userId);
    
    return this.http.get<User>("http://localhost:3000/api/users/"+userId, {headers: headers});
  }

  updateUser(user:Partial<User>){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.put("http://localhost:3000/api/users/"+user.userId, user, {headers:headers}).subscribe({
      next: () => {
        console.log("User was updated");
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

}
