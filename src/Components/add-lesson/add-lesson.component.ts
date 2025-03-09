import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { CoursesService } from '../../Services/LoginService/Courses/courses.service';
import { LessonService } from '../../Services/lessons/lesson.service';

@Component({
  selector: 'app-add-lesson',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule, RouterModule, MatSelectModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private lessonService: LessonService, private router: Router) {
  
    this.form = this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      content: ['', [Validators.required]],
      courseId: ['', [Validators.required]] 
    });
  }

  addLesson(e: Event) {
    e.preventDefault();
    console.log(this.form);
    
    if (this.form.valid) {
      this.lessonService.addLesson({
        title: this.form.get('title')?.value,
        content: this.form.get('content')?.value,
        courseId: this.form.get('courseId')?.value
      });
      this.router.navigate(['lessons']);
    }
    else {
      let errorMessage = '';

      if (this.form.get('title')?.hasError('required')) {
        errorMessage += 'Title is required.\n';
      }
      if (this.form.get('descraption')?.hasError('required')) {
        errorMessage += 'Descraption is required.\n';
      }
      if (this.form.get('teacherId')?.hasError('required')) {
        errorMessage += 'CourseId is required.\n';
      }

      alert(errorMessage || 'Form is invalid. Please fill in all required fields.');
    }
  }
}
