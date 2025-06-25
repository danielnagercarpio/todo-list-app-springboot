import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-task',
  imports: [FormsModule],
  templateUrl: './modal-edit-task.component.html',
  styleUrl: './modal-edit-task.component.scss'
})
export class ModalEditTaskComponent {
  task = {
    id: 0,              // o el ID real si estás editando una tarea existente
    title: '',
    completed: false
  };
    closeModal() {
    console.log("Closing Modal");
  }
  saveTask() {
    console.log("Saving Modal");
  }
}
