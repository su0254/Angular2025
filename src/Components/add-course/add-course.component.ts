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

@Component({
  selector: 'app-add-course',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule, RouterModule, MatSelectModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
form: FormGroup;
  roles = [
    'teacher','student'
  ];
  constructor(private fb: FormBuilder, private courseService: CoursesService, private router: Router) {
  
    this.form = this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      descraption: ['', [Validators.required]],
      teacherId: ['', [Validators.required]] 
    });
  }
  add(e: Event) {
    e.preventDefault();
    console.log(this.form);
    
    if (this.form.valid) {
      this.courseService.addCourse({
        title: this.form.get('title')?.value,
        description: this.form.get('descraption')?.value,
        teacherId: this.form.get('teacherId')?.value
      });
      this.router.navigate(['/courses']);
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
        errorMessage += 'TeacherId is required.\n';
      }

      alert(errorMessage || 'Form is invalid. Please fill in all required fields.');
    }
  }
}
