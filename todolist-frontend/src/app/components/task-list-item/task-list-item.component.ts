import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../../core/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list-item',
  imports: [FormsModule],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})

export class TaskListItemComponent {
  @Input() id : number = 0;
  @Input() title : string = "";
  @Input() done : boolean = false;
  @Output() onUpdateFromList : EventEmitter<string> = new EventEmitter<string>;
  @Output() deleteEvent : EventEmitter<string> = new EventEmitter<string>;

  constructor(private todoService : TodoService) {

  }

  onKeyDown(event : KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (key === 'e') {
      (event.target as HTMLElement).blur();
      this.updateClicked();
    }
    if (key === 'd') {
      (event.target as HTMLElement).blur();
      this.deleteTaskRequest();
    }
  }
  updateClicked() {
    this.onUpdateFromList.emit(this.id+","+this.title+","+this.done);
    console.log("clicado");
  }

  deleteTaskRequest() {
    this.todoService.deleteTask(this.id).subscribe({
      next: () => {
        console.log("Delete OK")
        this.deleteEvent.emit("");
      },
      error: () => {
        console.log("Error on delete")
      }
    });    
  }
}
