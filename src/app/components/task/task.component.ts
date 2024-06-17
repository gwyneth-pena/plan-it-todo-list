import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TaskService } from 'src/app/services/task.service';
import { EditDialogBoxComponent } from '../edit-dialog-box/edit-dialog-box.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: any;
  @Input() upcoming: any;
  @Input() missed: any;
  @Output() deleteClickedOrTaskUpdated = new EventEmitter<any>();

  complete: boolean = false;
  @Output() emittedUpdate = new EventEmitter<any>();

  constructor(private tasksService: TaskService, public matDialog: MatDialog) {}

  ngOnInit(): void {}

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe(
      (value) => {
        if (value?.msg) {
          this.deleteClickedOrTaskUpdated.emit(' ');
        }
      },
      (err) => {
        return;
      }
    );
  }

  checkIfComplete(id: any) {
    this.complete = !this.complete;
    var values = {
      id: id,
      completed: this.complete,
    };

    this.tasksService.updatedCompleted(values).subscribe((value) => {
      this.deleteClickedOrTaskUpdated.emit(' ');
    });
  }

  openDialog(task: any): void {
    var taskValues = {
      time_to_be_accomplished: this.tasksService.convertTimeToTwelve(
        task.time_to_be_accomplished
      ),
      time_to_start: this.tasksService.convertTimeToTwelve(task.time_to_start),
      id: task.id,
      task: task.task,
      date_to_be_accomplished: task.date_to_be_accomplished,
    };

    const dialogRef = this.matDialog.open(EditDialogBoxComponent, {
      width: '400px',
      data: taskValues,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.emittedUpdate.emit(result);
      }
    });
  }
}
