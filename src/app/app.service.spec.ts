import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { HttpResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Task } from './model/taks';

describe('AppService', () => {

  let service: AppService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });

    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('filterTaskByStatus', () => {

    it('task list is empty should return empty list', () => {
      const actual = service.filterTaskByStatus([], null);
      expect(actual.length).toEqual(0);
    });

    it('completed is null should return empty list', () => {
      const taskList: Task[] = [
        {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: true
        },
        {
          userId: 1,
          id: 2,
          title: 'quis ut nam facilis et officia qui',
          completed: false
        }
        ,
        {
          userId: 1,
          id: 3,
          title: 'fugiat veniam minus',
          completed: false
        }
      ];
      const actual = service.filterTaskByStatus(taskList, null);
      expect(actual.length).toEqual(0);
    });

    it('completed is true should return done list', () => {
      const taskList: Task[] = [
        {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: true
        },
        {
          userId: 1,
          id: 2,
          title: 'quis ut nam facilis et officia qui',
          completed: false
        }
        ,
        {
          userId: 1,
          id: 3,
          title: 'fugiat veniam minus',
          completed: false
        }
      ];
      const actual = service.filterTaskByStatus(taskList, true);
      expect(actual.length).toEqual(1);
    });

    it('completed is false should return todo list', () => {
      const taskList: Task[] = [
        {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: true
        },
        {
          userId: 1,
          id: 2,
          title: 'quis ut nam facilis et officia qui',
          completed: false
        }
        ,
        {
          userId: 1,
          id: 3,
          title: 'fugiat veniam minus',
          completed: false
        }
      ];
      const actual = service.filterTaskByStatus(taskList, false);
      expect(actual.length).toEqual(2);
    });

  });

  describe('getTasksByUserId', () => {

    it('not found task should return empty taskList', () => {

      // Arrange
      const taskList: Task[] = [];

      // Act and assert
      service.getTasksByUserId(1).subscribe((resp: HttpResponse<Task[]>) => {
        expect(resp.body.length).toEqual(0);
        expect(resp.status).toEqual(200);
      });

      // Assert
      const request = httpTestingController.expectOne(`http://jsonplaceholder.typicode.com/todos?userId=1`);
      expect(request.request.method).toEqual('GET');
      expect(request.request.url).toEqual(`http://jsonplaceholder.typicode.com/todos`);
      expect(request.request.params.get(`userId`)).toEqual(`1`);
      request.flush(taskList);
      httpTestingController.verify();

    });

    it('found task should return taskList', () => {

      // Arrange
      const task = new Task(1, 1, 'first task', false);
      const taskList: Task[] = [task];

      // Act and assert
      service.getTasksByUserId(1).subscribe((resp: HttpResponse<Task[]>) => {
        expect(resp.body.length).toEqual(1);
        expect(resp.status).toEqual(200);
      });

      // Assert
      const request = httpTestingController.expectOne(`http://jsonplaceholder.typicode.com/todos?userId=1`);
      expect(request.request.method).toEqual('GET');
      expect(request.request.url).toEqual(`http://jsonplaceholder.typicode.com/todos`);
      expect(request.request.params.get(`userId`)).toEqual(`1`);
      request.flush(taskList);
      httpTestingController.verify();

    });

  });

});
