
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private url = 'http://localhost:8080/api/courses';
  courses = new BehaviorSubject<Course[]>([]);
  error = '';

  constructor(private http: HttpClient) {}

  load() {
    this.http.get<Course[]>(this.url).subscribe({
      next: data => { this.courses.next(data); this.error = ''; },
      error: () => this.error = 'Could not load courses'
    });
  }

  save(course: Course) {
    return course.id
      ? this.http.put<Course>(`${this.url}/${course.id}`, course)
      : this.http.post<Course>(this.url, course);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
