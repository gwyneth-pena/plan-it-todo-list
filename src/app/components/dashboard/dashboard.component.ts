import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { TaskService } from 'src/app/services/task.service';
import * as moment from 'moment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private tasksService: TaskService,
    public authService: AuthenticateService,
    @Inject(LOCALE_ID) public locale: string,
    private router: Router
  ) {}
  taskList: any = [];
  accomplished: any;
  upcomingTasks: any;
  todaysTasks: any;
  taskForm: any;
  morning: boolean = false;
  afternoon: boolean = false;
  evening: boolean = false;
  missedTasks: any;

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      task: ['', [Validators.required]],
      time_to_start: ['', [Validators.required]],
      time_to_be_accomplished: ['', [Validators.required]],
      date_to_be_accomplished: ['', [Validators.required]],
    });
    var date = new Date();
    var hours = date.getHours();
    var mins = date.getMinutes();

    if (hours <= 11 && mins <= 59) {
      this.getTasks();
      this.morning = true;
    } else if (hours > 11 && hours <= 17 && mins <= 59) {
      this.getTasks();

      this.afternoon = true;
    } else {
      this.getTasks();
      this.evening = true;
    }

    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService
      .getCurrentUser(this.authService.userId)
      .subscribe((name) => {
        this.authService.currentUser = `${name.userName.first_name} ${name.userName.last_name}`;
      });
  }

  updateTask(event: any) {
    var values = {
      id: event.id,
      time_to_be_accomplished: this.tasksService.convertTimeToTwentyFour(
        event.time_to_be_accomplished
      ),
      date_to_be_accomplished: formatDate(
        new Date(event.date_to_be_accomplished).toLocaleDateString(),
        'YYYY-MM-dd HH:mm:ss',
        'en-PH'
      ),
      time_to_start: this.tasksService.convertTimeToTwentyFour(
        event.time_to_start
      ),
      task: event.task,
    };

    this.tasksService.editTask(values).subscribe((val) => {
      if (val.msg) {
        this.getTasks();
      }
    });
  }

  submitTask() {
    var values = {
      user_id: this.authService.userId,
      task: this.taskForm.value.task,
      time_to_start: this.tasksService.convertTimeToTwentyFour(
        this.taskForm.value.time_to_start
      ),
      time_to_be_accomplished: this.tasksService.convertTimeToTwentyFour(
        this.taskForm.value.time_to_be_accomplished
      ),
      date_to_be_accomplished: formatDate(
        new Date(
          this.taskForm.value.date_to_be_accomplished
        ).toLocaleDateString(),
        'YYYY-MM-dd HH:mm:ss',
        'en-PH'
      ),
      completed: false,
    };

    if (
      moment.utc(values.date_to_be_accomplished).local().format('ll') >=
      moment().format('ll')
    ) {
      this.tasksService.addTask(values).subscribe(
        (val) => {
          this.taskForm.reset();
          this.getTasks();
        },
        (err) => {
          this.router.navigate(['/login']);
        }
      );
    } else {
      return;
    }
  }

  deleteIsClickedOrTaskUpdated(event: any) {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTask().subscribe(
      (value) => {
        this.authService.userId = value.user_id;

        this.taskList = value.taskList;
        this.sortTasksandGetAccomplished();
      },
      (err) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    );
  }

  async sortTasksandGetAccomplished() {
    if (this.taskList.length > 0) {
      this.todaysTasks = await this.taskList.filter(
        (task: any) =>
          moment(task.date_to_be_accomplished).format('ll') ===
          moment().format('ll')
      );

      await this.todaysTasks.sort((val1: any, val2: any) => {
        return (
          <any>(
            new Date(
              `${this.tasksService.formatDate(val1.date_to_be_accomplished)} ${
                val1.time_to_start
              }`
            )
          ) -
          <any>(
            new Date(
              `${this.tasksService.formatDate(val2.date_to_be_accomplished)} ${
                val2.time_to_start
              }`
            )
          )
        );
      });

      this.upcomingTasks = await this.taskList.filter(
        (task: any) =>
          new Date(moment(task.date_to_be_accomplished).format('ll')) >
          new Date(moment().format('ll'))
      );

      await this.upcomingTasks.sort((val1: any, val2: any) => {
        return (
          <any>(
            new Date(this.tasksService.formatDate(val1.date_to_be_accomplished))
          ) -
          <any>(
            new Date(this.tasksService.formatDate(val2.date_to_be_accomplished))
          )
        );
      });

      await this.upcomingTasks.sort((val1: any, val2: any) => {
        return (
          <any>(
            new Date(
              `${this.tasksService.formatDate(val1.date_to_be_accomplished)} ${
                val1.time_to_start
              }`
            )
          ) -
          <any>(
            new Date(
              `${this.tasksService.formatDate(val2.date_to_be_accomplished)} ${
                val2.time_to_start
              }`
            )
          )
        );
      });

      this.missedTasks = await this.taskList.filter(
        (task: any) =>
          new Date(moment(task.date_to_be_accomplished).format('ll')) <
            new Date(moment().format('ll')) && task.completed === 0
      );

      await this.missedTasks.sort((val1: any, val2: any) => {
        return (
          <any>(
            new Date(this.tasksService.formatDate(val1.date_to_be_accomplished))
          ) -
          <any>(
            new Date(this.tasksService.formatDate(val2.date_to_be_accomplished))
          )
        );
      });

      await this.missedTasks.sort((val1: any, val2: any) => {
        return (
          <any>(
            new Date(
              `${this.tasksService.formatDate(val1.date_to_be_accomplished)} ${
                val1.time_to_start
              }`
            )
          ) -
          <any>(
            new Date(
              `${this.tasksService.formatDate(val2.date_to_be_accomplished)} ${
                val2.time_to_start
              }`
            )
          )
        );
      });

      this.getAccomplishedTask();
    } else {
      this.todaysTasks = [];
      this.upcomingTasks = [];
      this.missedTasks = [];
    }
  }

  async getAccomplishedTask() {
    if (this.todaysTasks?.length > 0) {
      this.accomplished = await this.todaysTasks.filter(
        (task: any) => task.completed
      );
    }
  }
}
