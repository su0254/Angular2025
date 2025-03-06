import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../Services/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private userService:UserService, private router:Router) { }

  deleteUser() {
    this.userService.deleteUserById(Number(localStorage.getItem('userId')));
    this.logout();
  }

  showCourses(){
    this.router.navigate(['/courses']);
  }

  updateUser(){
    this.router.navigate(['/updateUser']);
  }

  logout(){
    this.router.navigate(['/login']);
  }
}
