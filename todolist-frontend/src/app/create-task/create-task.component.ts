import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-create-task',
  imports: [RouterOutlet, HeaderComponent, TaskListComponent, JsonPipe],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

  dataReceived : any;

  constructor(private todoService : TodoService) {

  }
  ngOnInit() : void{
    this.todoService.getTasks().subscribe({
      next: data => this.dataReceived = data,
      error: err => console.error(err)
    });
  }


}
