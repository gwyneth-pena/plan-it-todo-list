import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/models/task.model';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from './handle-error.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private http: HttpClient,
    private errorHandler: HandleErrorService
  ) {}
  private url = `${environment.apiURL}/tasks`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addTask(taskObject: any): Observable<Task> {
    return this.http
      .post<Task>(`${this.url}/add`, taskObject, this.httpOptions)
      .pipe(catchError(this.errorHandler.errorHandler));
  }

  getTask(): Observable<any> {
    return this.http
      .get<any>(this.url, this.httpOptions)
      .pipe(catchError(this.errorHandler.errorHandler));
  }

  deleteTask(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/delete/${id}`)
      .pipe(catchError(this.errorHandler.errorHandler));
  }

  updatedCompleted(values: any) {
    return this.http
      .patch(`${this.url}/updateCompleted`, values, this.httpOptions)
      .pipe(catchError(this.errorHandler.errorHandler));
  }

  editTask(values: any): Observable<any> {
    return this.http
      .patch(`${this.url}/update`, values, this.httpOptions)
      .pipe(catchError(this.errorHandler.errorHandler));
  }

  convertTimeToTwelve(value: any) {
    var val = value.split(':');
    var minsNum = parseInt(val[1]);
    var hourNum = parseInt(val[0]);
    var amOrPM = hourNum <= 11 && minsNum <= 59 ? 'AM' : 'PM';

    var mins = val[1];
    var hours = hourNum < 12 ? val[0] : (hourNum % 12).toString();
    if (hourNum == 0) {
      hours = '12';
      amOrPM = 'AM';
    }
    if (hourNum == 12) {
      hours = '12';
      amOrPM = 'PM';
    }
    var time = `${hours}:${mins} ${amOrPM}`;

    return time;
  }

  convertTimeToTwentyFour(time: any) {
    var timeString = time.toString().split(':');
    var hourInit = timeString[0];
    var mins = timeString[1].split(' ')[0];
    var amPm = timeString[1].split(' ')[1];
    var hour;
    if (hourInit === '12' && amPm === 'AM') {
      hour = '00';
    } else if (hourInit === '12' && amPm === 'PM') {
      hour = hourInit;
    } else if (parseInt(hourInit) <= 12 && amPm === 'PM') {
      hour = parseInt(hourInit) + 12;
    } else {
      hour = hourInit;
    }

    var convertedTime = `${hour}:${mins}:00`;

    return convertedTime;
  }

  formatDate(dateInit: any) {
    var dateToLocal = moment.utc(dateInit).local().format('MM/DD/YYYY');

    return dateToLocal;
  }
}
