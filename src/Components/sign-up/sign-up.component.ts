import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../Services/LoginService/auth.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-sign-up',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule, RouterModule, MatSelectModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form: FormGroup;
  roles = [
    'teacher','student'
  ];
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
  
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.min(2)])],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', Validators.required]
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  signUp(e: Event) {
    e.preventDefault();
    console.log(this.form);
    
    if (this.form.valid) {
      this.loginService.signUp({
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        role: this.form.get('role')?.value
      });
      this.router.navigate(['/dashboard']);
    }
    else {
      let errorMessage = '';

      if (this.form.get('name')?.hasError('required')) {
        errorMessage += 'Name is required.\n';
      }
      if (this.form.get('name')?.hasError('minlength')) {
        errorMessage += 'Name must be at least 2 characters long.\n';
      }
      if (this.form.get('email')?.hasError('required')) {
        errorMessage += 'Email is required.\n';
      }
      if (this.form.get('email')?.hasError('email')) {
        errorMessage += 'Please enter a valid email address.\n';
      }
      if (this.form.get('password')?.hasError('required')) {
        errorMessage += 'Password is required.\n';
      }
      if (this.form.get('role')?.hasError('required')) {
        errorMessage += 'Role is required.\n';
      }

      alert(errorMessage || 'Form is invalid. Please fill in all required fields.');
    }
  }
}
