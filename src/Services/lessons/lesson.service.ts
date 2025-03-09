import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../../Models/Lesson';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private lessonsSubject : BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  public lessons$ = this.lessonsSubject.asObservable();

  constructor(private http:HttpClient) { }

  getLessons(courseId:number){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.get<Lesson[]>("http://localhost:3000/api/courses/"+courseId+"/lessons", {headers: headers}).subscribe({
      next: (response:Lesson[]) => {
        console.log(response,"res");
        
        this.lessonsSubject.next(response);
        console.log(this.lessonsSubject,"sub");
        console.log(this.lessons$,'$');
        
        
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  getLessonById(id:number){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<Lesson>("http://localhost:3000/api/lessons/"+id, {headers: headers});
  }

  addLesson(lesson:Partial<Lesson>){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    console.log("lesson", lesson);
    
    this.http.post<Lesson>(`http://localhost:3000/api/courses/${lesson.courseId}/lessons`,lesson, {headers:headers}).subscribe({
      next: () => {
        console.log("next");
        
        this.getLessons(Number(lesson.courseId));
      },
      error: (error) => {
        console.log(error);
        
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  deleteLesson(lesson:Partial<Lesson>){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.delete("http://localhost:3000/api/courses/"+lesson.courseId+"/lessons/"+lesson.id, {headers: headers}).subscribe({
      next: () => {
        this.getLessons(Number(lesson.id));
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  updateLesson(lesson:Partial<Lesson>){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.put("http://localhost:3000/api/lessons/"+lesson.id, lesson, {headers: headers}).subscribe({
      next: () => {
        console.log("Lesson was updated");
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }
}
