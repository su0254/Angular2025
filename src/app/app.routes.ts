import { Routes } from '@angular/router';
import { SignUpComponent } from '../Components/sign-up/sign-up.component';
import { LoginComponent } from '../Components/login/login.component';
import { CoursesComponent } from '../Components/courses/courses.component';
import { LessonsComponent } from '../Components/lessons/lessons.component';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { UpdateUserComponent } from '../Components/update-user/update-user.component';
import { UpdateLessonComponent } from '../Components/update-lesson/update-lesson.component';
import { UpdateCourseComponent } from '../Components/update-course/update-course.component';
import { AddCourseComponent } from '../Components/add-course/add-course.component';
import { AddLessonComponent } from '../Components/add-lesson/add-lesson.component';

export function getPrerenderParams() {
    return [
        { id: '1' },
        { id: '2' },
    ];
}


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'sign_up', component: SignUpComponent },
    { path: 'courses', component: CoursesComponent},
    // {path: 'courses/:id', component: LessonsComponent},
    {path:'dashboard', component: DashboardComponent},
    {path: 'updateUser', component: UpdateUserComponent},
    // {path:'edit-lesson/:id', component: UpdateLessonComponent},
    // {path:'edit-course/:id', component: UpdateCourseComponent},
    {path:'add-course', component:AddCourseComponent},
    {path: 'add-lesson', component:AddLessonComponent}
];
