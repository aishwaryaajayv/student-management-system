
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  standalone: true,
  template: `
    <div class="overlay">
      <div class="modal">
        <h3>Confirm Delete</h3>
        <p>{{ message }}</p>
        <button class="danger" (click)="answer.emit(true)">Delete</button>
        <button class="light" (click)="answer.emit(false)">Cancel</button>
      </div>
    </div>
  `
})
export class ConfirmComponent {
  @Input() message = 'Are you sure?';
  @Output() answer = new EventEmitter<boolean>();
}
