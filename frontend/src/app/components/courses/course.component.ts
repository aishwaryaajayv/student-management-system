
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule, AsyncPipe, ConfirmComponent],
  templateUrl: './course.component.html'
})
export class CourseComponent {
  form: Course = { name: '' };
  deleting: number | null = null;
  error = '';

  constructor(public courses: CourseService, private students: StudentService) {
    courses.load();
  }

  edit(c: Course) {
    this.form = { ...c };
  }

  reset() {
    this.form = { name: '' };
  }

  save() {
    this.courses.save(this.form).subscribe({
      next: () => {
        this.reset();
        this.courses.load();
        this.error = '';
      },
      error: e => this.error = e.error?.message || 'Could not save course'
    });
  }

  remove(ok: boolean) {
    const id = this.deleting;
    this.deleting = null;

    if (ok && id !== null) {
      this.courses.delete(id).subscribe({
        next: () => {
          this.courses.load();
          this.students.load();
          this.error = '';
        },
        error: e => this.error = e.error?.message || 'Could not delete course'
      });
    }
  }
}
