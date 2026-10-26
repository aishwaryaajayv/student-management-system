
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private url = 'http://localhost:8080/api/students';
  students = new BehaviorSubject<Student[]>([]);
  error = '';

  constructor(private http: HttpClient) {}

  load() {
    this.http.get<Student[]>(this.url).subscribe({
      next: data => { this.students.next(data); this.error = ''; },
      error: () => this.error = 'Could not load students'
    });
  }

  save(student: Student, courseIds: number[]) {
    const body = { name: student.name, email: student.email, courseIds };
    return student.id
      ? this.http.put<Student>(`${this.url}/${student.id}`, body)
      : this.http.post<Student>(this.url, body);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
