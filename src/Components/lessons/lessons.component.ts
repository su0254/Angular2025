import { Component, Input } from '@angular/core';
import { LessonService } from '../../Services/lessons/lesson.service';
import { Observable } from 'rxjs';
import { Lesson } from '../../Models/Lesson';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UpdateLessonComponent } from "../update-lesson/update-lesson.component";

@Component({
  selector: 'app-lessons',
  imports: [MatListModule, AsyncPipe, MatToolbarModule, MatButtonModule, MatIconModule, UpdateLessonComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {

  @Input() courseId=0;
  lessonId=false;
  lessons$: Observable<Lesson[]> | undefined;
  // id: number | undefined;
  roleUser:any;
  constructor(private lessonService: LessonService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {

    // this.route.paramMap.subscribe(params => {
    //   if (params.has('id')) {
    //     this.id = Number(params.get('id'));
    //   }
    // })
    console.log(this.courseId);
    
    if (this.courseId) {
      console.log(this.courseId);
      
      this.lessonService.getLessons(this.courseId);
      this.lessons$ = this.lessonService.lessons$;
      console.log(this.lessons$,"$ in lesson");
      
      this.roleUser=localStorage.getItem('role');
    }
  }

  editLesson(lessonId: Number) {
    //this.router.navigate([`/edit-lesson/${lessonId}`]);
    this.lessonId=true;
  }

  deleteLesson(lesson:Partial<Lesson>) {
    this.lessonService.deleteLesson(lesson);
  }

  addLesson(){
    this.router.navigate(['add-lesson']);
    console.log(this.lessons$,"$ in lesson in add func");
    
  }
}
