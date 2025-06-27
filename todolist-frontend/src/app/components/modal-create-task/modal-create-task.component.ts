import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../core/todo.service';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-create-task',
  imports: [FormsModule],
  templateUrl: './modal-create-task.component.html',
  styleUrl: './modal-create-task.component.scss'
})
export class ModalCreateTaskComponent {
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  
  notifyParent() {
    this.notify.emit('Hola desde el hijo!');
  }
  modalOpen : boolean = true;
  task : Task = {
    title: '',
    done: false
  };

  constructor(private todoService : TodoService) {}
  closeModal() {
    console.log("Closing Modal");
            this.notifyParent();

    this.modalOpen = !this.modalOpen;
  }
  saveTask() {
    console.log("Saving Modal");
    this.todoService.saveTask(this.task).subscribe({
      next: (response) => {
        this.modalOpen = !this.modalOpen;
        this.notifyParent();
      },
      error: (err) => {
        console.error('Error al guardar la tarea:', err);
      },
    });
  }

  onKeyDown(event : KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (key === 'enter') {
      (event.target as HTMLElement).click();
      this.notifyParent();
    }
  }

}
