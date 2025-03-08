import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CoursesService } from '../../Services/LoginService/Courses/courses.service';
import { Course } from '../../Models/Course';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LessonsComponent } from '../lessons/lessons.component';
import { UpdateCourseComponent } from '../update-course/update-course.component';

@Component({
  selector: 'app-courses',
  imports: [MatListModule, AsyncPipe, MatToolbarModule, MatButtonModule, MatIconModule, LessonsComponent, UpdateCourseComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courseId=false;
  updateCourse=false;
  courses$: Observable<Course[]> | undefined;
  roleUser:any;
  constructor(private courseService:CoursesService, private router:Router) {}
  
  ngOnInit(){
    this.courseService.getCourses();
    this.courses$ = this.courseService.courses$;
    console.log(this.courses$);
    this.roleUser=localStorage.getItem('role');
  }

  enroll(course:Course){
    console.log("enroll", course);
    
      this.courseService.addUsersToCourse(course.id, Number(JSON.stringify(localStorage.getItem('userId'))));
  }

  showLessons(course:Course){
    //this.router.navigate([`courses/${course.id}`]);
    this.courseId=true;
  }

  deleteCourse(course:Course){
    this.courseService.deleteCourse(course.id);
  }

  unenroll(course:Course){
    //this.courseService.removeUserFromCourse(course.id, Number(JSON.stringify(localStorage.getItem('userId'))));
  }

  editCourse(course:Course){
    //this.router.navigate([`edit-course/${course.id}`]);
    this.updateCourse=true;
  }

  addCourse(){
    this.router.navigate(['add-course']);
  }
}
