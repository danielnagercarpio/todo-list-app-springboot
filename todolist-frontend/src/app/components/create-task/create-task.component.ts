import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../../core/todo.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { ModalEditTaskComponent } from "../modal-edit-task/modal-edit-task.component";


@Component({
  selector: 'app-create-task',
  imports: [RouterOutlet, HeaderComponent, TaskListComponent, ModalEditTaskComponent, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

  dataReceived : any;
  editInputs : any;
  isEditModalVisible : boolean = false;

  constructor(private todoService : TodoService) {

  }

  refreshData() {
    this.todoService.getTasks().subscribe({
      next: data => this.dataReceived = data,
      error: err => console.error(err)
    });
  }

  ngOnInit() : void{
    this.refreshData()
  }
  @Output() refresh = new EventEmitter<void>();

  onUpdateFromList(valor : string) {
    this.editInputs = {id: valor.split(",")[0], title: valor.split(",")[1], done: valor.split(",")[2] === 'true'}
    this.isEditModalVisible = !this.isEditModalVisible;
    console.log(this.editInputs);
  }

  onRefreshFromHeader() {
    this.refreshData();
  }

  invertModal() {
    this.isEditModalVisible = !this.isEditModalVisible;
  }
}
