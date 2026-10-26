
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FormsModule, AsyncPipe, ConfirmComponent],
  templateUrl: './student.component.html'
})
export class StudentComponent {
    form: Student = { name: '', email: '', courses: [] };
    courseIds: number[] = [];
    deleting: number | null = null;
    error = '';

    constructor(public students: StudentService, public courses: CourseService) {
        students.load();
        courses.load();
    }

    names(s: Student) {
        return s.courses.map(c => c.name).join(', ') || '-';
    }

    edit(s: Student) {
        this.form = { ...s };
        this.courseIds = s.courses.map(c => c.id!);
    }

    reset() {
        this.form = { name: '', email: '', courses: [] };
        this.courseIds = [];
    }

    save() {
        this.students.save(this.form, this.courseIds).subscribe({
        next: () => {
            this.reset();
            this.students.load();
            this.error = '';
        },
        error: e => this.error = e.error?.message || 'Could not save student'
        });
    }

    remove(ok: boolean) {
        const id = this.deleting;
        this.deleting = null;

        if (ok && id !== null) {
        this.students.delete(id).subscribe({
            next: () => this.students.load(),
            error: e => this.error = e.error?.message || 'Could not delete student'
        });
        }
    }

  
    toggleCourse(id: number) {
    this.courseIds = this.courseIds.includes(id)
        ? this.courseIds.filter(x => x !== id)
        : [...this.courseIds, id];
    }


    courseOpen = false;

    @ViewChild('courseBox') courseBox!: ElementRef;

    addCourse(id: number) {
    if (!this.courseIds.includes(id))
        this.courseIds = [...this.courseIds, id];
    this.courseOpen = false;
    }

    removeCourse(id: number) {
    this.courseIds = this.courseIds.filter(x => x !== id);
    }

    @HostListener('document:click', ['$event'])
    closeDropdown(event: MouseEvent) {
    if (this.courseBox && !this.courseBox.nativeElement.contains(event.target))
        this.courseOpen = false;
    }


}
