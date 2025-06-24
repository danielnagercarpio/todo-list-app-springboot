import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-list-item',
  imports: [],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  @Input() title : string = "";
  @Input() done : string = "";
}
