import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/userService/user.service';
import { User } from '../../Models/User';

@Component({
  selector: 'app-update-user',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule, RouterModule, MatSelectModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  form: FormGroup = new FormGroup({})
  roles = [
    'teacher', 'student'
  ];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

    let user: User | undefined;
    const userId = Number(localStorage.getItem('userId'));
    console.log(userId);

    this.userService.getUserById(userId)?.subscribe((response) => {
      console.log("res", response)
      user = response;
      console.log(user);

      this.form = this.fb.group({
        name: [user?.name, Validators.compose([Validators.required, Validators.minLength(2)])],
        email: [user?.email, [Validators.required, Validators.email]],
        password: [user?.password, [Validators.required]],
        role: [user?.role, Validators.required]
      });
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  update(e: Event) {
    e.preventDefault();
    console.log(this.form);

    if (this.form?.valid) {
      this.userService.updateUser({
        userId: Number(localStorage.getItem('userId')),
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
        role: this.form.get('role')?.value
      });
      this.router.navigate(['/dashboard']);
    } else {
      let errorMessage = '';

      if (this.form?.get('name')?.hasError('required')) {
        errorMessage += 'Name is required.\n';
      }
      if (this.form?.get('name')?.hasError('minlength')) {
        errorMessage += 'Name must be at least 2 characters long.\n';
      }
      if (this.form?.get('email')?.hasError('required')) {
        errorMessage += 'Email is required.\n';
      }
      if (this.form?.get('email')?.hasError('email')) {
        errorMessage += 'Please enter a valid email address.\n';
      }
      if (this.form?.get('password')?.hasError('required')) {
        errorMessage += 'Password is required.\n';
      }
      if (this.form?.get('role')?.hasError('required')) {
        errorMessage += 'Role is required.\n';
      }

      alert(errorMessage || 'Form is invalid. Please fill in all required fields.');
    }
  }
}