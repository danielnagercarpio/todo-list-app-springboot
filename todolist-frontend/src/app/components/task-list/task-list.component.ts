import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TaskListItemHeaderComponent } from '../task-list-item-header/task-list-item-header.component';
import { ModalCreateTaskComponent } from "../modal-create-task/modal-create-task.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [TaskListItemComponent, TaskListItemHeaderComponent, ModalCreateTaskComponent, NgIf],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Output() refreshRequested = new EventEmitter<void>();
  @Input() wide : boolean = false;
  @Input() data  : any;
  isCreateTaskVisible : boolean = false;
  
  showCreateTaskModal() {
    this.isCreateTaskVisible = !this.isCreateTaskVisible;
  }
  onRefreshClick() {
    this.refreshRequested.emit();
  }

  @HostBinding('class.wide') get isWide() {
    return this.wide;
  }
}
