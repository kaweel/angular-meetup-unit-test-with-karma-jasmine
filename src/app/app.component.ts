import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Task } from './model/taks';
import { User } from './model/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormSearch } from './model/form-search';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'testing-angular';
  name: string;

  todoList: Task[];
  doneList: Task[];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({ username: [''] });
  }

  onSubmit() {
    this.name = '';
    this.todoList = [];
    this.doneList = [];
    const request: FormSearch = this.form.getRawValue();
    this.service.getUserByUsername(request.username)
      .pipe(
        mergeMap((resp: HttpResponse<User[]>) => {
          if (resp.body.length === 1) {
            const user = resp.body[0];
            this.name = user.name;
            return this.service.getTasksByUserId(user.id);
          }
          this.name = 'User Not Found';
          return of();
        })
      ).subscribe(
        (resp: HttpResponse<Task[]>) => {
          const taskList = resp.body;
          this.todoList = this.service.filterTaskByStatus(taskList, false);
          this.doneList = this.service.filterTaskByStatus(taskList, true);
        },
        (error: HttpErrorResponse) => {
          alert(error.statusText);
        },
        () => { }
      );
  }

}
