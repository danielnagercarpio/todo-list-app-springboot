import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TaskListItemHeaderComponent } from '../task-list-item-header/task-list-item-header.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskListItemComponent, TaskListItemHeaderComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Output() refreshRequested = new EventEmitter<void>();
  @Input() wide : boolean = false;
  @Input() data  : any;

  onRefreshClick() {
    console.log("entra y bien");
    this.refreshRequested.emit();
  }

  @HostBinding('class.wide') get isWide() {
    return this.wide;
  }
}
