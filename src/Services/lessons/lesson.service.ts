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
        this.lessonsSubject.next(response);
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
    this.http.post<Lesson>(`http://localhost:3000/api/courses/${lesson.courseId}/lessons`,lesson, {headers:headers}).subscribe({
      next: () => {
        this.getLessons(Number(lesson.courseId));
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }

  deleteLesson(id:Number){
    const token = sessionStorage.getItem('token');
    if(!token){
      return;
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.delete("http://localhost:3000/api/lessons/"+id, {headers: headers}).subscribe({
      next: () => {
        this.getLessons(Number(id));
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
    this.http.put("http://localhost:3000/api/lessons/"+lesson.lessonId, lesson, {headers: headers}).subscribe({
      next: () => {
        console.log("Lesson was updated");
      },
      error: (error) => {
        console.error('Error occurred:', error); // טיפול בשגיאות
      }
    })
  }


}
