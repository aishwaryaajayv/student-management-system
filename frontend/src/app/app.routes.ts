
import { Routes } from '@angular/router';
import { StudentComponent } from './components/students/student.component';
import { CourseComponent } from './components/courses/course.component';

export const routes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: 'courses', component: CourseComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: '**', redirectTo: 'students' }
];
