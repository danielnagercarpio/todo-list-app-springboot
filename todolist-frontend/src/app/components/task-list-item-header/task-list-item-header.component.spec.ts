import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListItemHeaderComponent } from './task-list-item-header.component';

describe('TaskListItemHeaderComponent', () => {
  let component: TaskListItemHeaderComponent;
  let fixture: ComponentFixture<TaskListItemHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListItemHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
