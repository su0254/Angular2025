import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "../Components/login/login.component";
import { SignUpComponent } from "../Components/sign-up/sign-up.component";
import { CoursesComponent } from "../Components/courses/courses.component";
import { DashboardComponent } from "../Components/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, SignUpComponent, CoursesComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Courses-Online';
}
