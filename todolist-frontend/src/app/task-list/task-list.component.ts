import { Component, Input, HostBinding } from '@angular/core';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TaskListItemHeaderComponent } from '../task-list-item-header/task-list-item-header.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskListItemComponent, TaskListItemHeaderComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() wide : boolean = false;
  @HostBinding('class.wide') get isWide() {
    return this.wide;
  }
}
