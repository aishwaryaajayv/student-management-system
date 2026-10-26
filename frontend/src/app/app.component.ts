
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <main>
      <h1>Student Management</h1>
      <nav>
        <a routerLink="/students" routerLinkActive="active">Students</a>
        <a routerLink="/courses" routerLinkActive="active">Courses</a>
      </nav>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}
