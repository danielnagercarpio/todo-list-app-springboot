import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../core/todo.service';

@Component({
  selector: 'app-modal-edit-task',
  imports: [FormsModule],
  templateUrl: './modal-edit-task.component.html',
  styleUrl: './modal-edit-task.component.scss'
})

export class ModalEditTaskComponent {
  @Input() task = {
    id: 0,
    title: '',
    done: false
  };

  @Output() refreshRequested = new EventEmitter<string>;
  @Output() closeModalEvent = new EventEmitter<string>;
  @ViewChild('focusTitle') campoInput!: ElementRef<HTMLInputElement>;
  
  constructor(private todoService : TodoService) {

  }

  ngAfterViewInit() {
    this.campoInput.nativeElement.focus();
  }
  
  closeModal() {
    this.closeModalEvent.emit();
  }

  saveTask() {
    this.todoService.editTask(this.task.id, this.task).subscribe({
      next: () => {
        console.log("The update has been completed successfully");
        this.closeModal();
        this.refreshRequested.emit();
      },
      error: () => {
        console.error("There was an error")
      }
    })
  }
}
