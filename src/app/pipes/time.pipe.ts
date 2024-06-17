import { Pipe, PipeTransform } from '@angular/core';
import { TaskService } from '../services/task.service';

@Pipe({ name: 'timePipe' })
export class TimePipe implements PipeTransform {
  constructor(private tasksService: TaskService) {}

  transform(value: string): string {
    var time = this.tasksService.convertTimeToTwelve(value);

    return time;
  }
}
