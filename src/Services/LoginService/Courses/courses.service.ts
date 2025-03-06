import { Injectable } from '@angular/core';
import { Course } from '../../../Models/Course';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private coursesSubject : BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(private http:HttpClient) { }

  getCourses(){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.get<Course[]>("http://localhost:3000/api/courses", {headers: headers}).subscribe({
      next: (response:Course[]) => {
        this.coursesSubject.next(response);
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  getCourseById(id:number){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Course>("http://localhost:3000/api/courses/"+id, {headers: headers});
  }

  addCourse(course:Partial<Course>){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.post<Course>("http://localhost:3000/api/courses",course, {headers:headers}).subscribe({
      next: () => {
        this.getCourses();
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  deleteCourse(id:number){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.delete<Course>("http://localhost:3000/api/courses/"+id, {headers:headers}).subscribe({
      next: () => {
        this.getCourses();
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  updateCourse(course:Partial<Course>){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token );
    this.http.put<Course>("http://localhost:3000/api/courses/"+course.id,course, {headers:headers}).subscribe({
      next: () => {
        this.getCourses();
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  addUsersToCourse(courseId:number, userId:number){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.post("http://localhost:3000/api/courses/"+courseId+"/enroll",userId, {headers:headers}).subscribe({
      next: () => {
        this.getCourses();
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }
}
