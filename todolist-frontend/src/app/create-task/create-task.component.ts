import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-create-task',
  imports: [RouterOutlet, HeaderComponent, TaskListComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

}
