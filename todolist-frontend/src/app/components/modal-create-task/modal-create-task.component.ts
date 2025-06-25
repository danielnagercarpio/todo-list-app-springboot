import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-create-task',
  imports: [],
  templateUrl: './modal-create-task.component.html',
  styleUrl: './modal-create-task.component.scss'
})
export class ModalCreateTaskComponent {
  modalOpen : boolean = true;

  closeModal() {
    console.log("Closing Modal");
    this.modalOpen = !this.modalOpen;
  }
  saveTask() {
    console.log("Saving Modal");
    this.modalOpen = !this.modalOpen;
  }

}
