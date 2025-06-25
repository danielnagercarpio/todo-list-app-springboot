import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { TodoService } from '../../core/todo.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list-item',
  imports: [],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  @Input() id : string = "";
  @Input() title : string = "";
  @Input() done : string = "";

  constructor(private todoService : TodoService) {

  }
  updateData (id: string) {
    const taskData = {
      id: Number(id),
      title: this.title+"sasasas",
      done: Boolean(this.done)
    };
    this.todoService.editTask(Number(id), taskData).subscribe(
      response => {
        console.log("OK");
      },
      error => {
        console.error("Error")
      }
    )
  }
}
