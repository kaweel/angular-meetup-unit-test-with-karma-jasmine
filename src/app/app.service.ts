import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './model/taks';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getTasksByUserId(userId: number): Observable<HttpResponse<Task[]>> {
    const params = new HttpParams().set(`userId`, String(userId));
    return this.httpClient.get<Task[]>(`http://jsonplaceholder.typicode.com/todos`, { params, observe: `response` });
  }

  getUserByUsername(username: string): Observable<HttpResponse<User[]>> {
    const params = new HttpParams().set(`username`, username);
    return this.httpClient.get<User[]>(`http://jsonplaceholder.typicode.com/users`, { params, observe: `response` });
  }

  filterTaskByStatus(taskList: Task[], completed: boolean): Task[] {
    return taskList.filter((task: Task) => task.completed === completed);
  }
}
