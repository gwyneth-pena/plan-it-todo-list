import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { appearUp } from 'src/app/animations/animations';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [appearUp],
})
export class TaskListComponent implements OnInit {
  constructor(public authService: AuthenticateService) {}

  @Input() upcomingTasks: any;
  @Input() todaysTasks: any;
  @Input() accomplished: any = 0;
  @Output() deleteOrUpdateToGetTaskEvent: any = new EventEmitter<any>();
  @Output() update: any = new EventEmitter<any>();
  @Input() missedTasks: any;

  ngOnInit(): void {}
  takeUpdateAndSend(event: any) {
    if (event) {
      this.update.emit(event);
    }
  }
  deleteIsClickedOrTaskUpdated(event: any) {
    this.deleteOrUpdateToGetTaskEvent.emit(event);
  }

  trackById(index: any, task: any) {
    return task.id;
  }
}
