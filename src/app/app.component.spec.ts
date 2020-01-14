import { TestBed, getTestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppService } from './app.service';
import { of, Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { Task } from './model/taks';

describe('AppComponent', () => {

  let service: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AppService
      ]
    }).compileComponents();
    service = TestBed.get(AppService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'testing-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('testing-angular');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to testing-angular!');
  });

  describe('onSubmit', () => {
    it('have some exception should alert msg', fakeAsync(() => {

      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const app = fixture.componentInstance;

      const obs = new Observable<HttpResponse<User[]>>(observ => {
        const httpErrorResponse = new HttpErrorResponse({ status: 400, statusText: 'Not Found' });
        observ.error(httpErrorResponse);
        observ.complete();
      });

      spyOn(service, 'getUserByUsername').and.returnValue(obs);
      spyOn(window, 'alert');
      tick();

      app.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('Not Found');
      expect(service.getUserByUsername).toHaveBeenCalledTimes(1);
      expect(app.name).toEqual('');
      expect(app.todoList.length).toEqual(0);
      expect(app.doneList.length).toEqual(0);
    }));

    it('not found user should not call getTasksByUserId', fakeAsync(() => {

      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const app = fixture.componentInstance;

      const obs = new Observable<HttpResponse<User[]>>(observ => {
        const httpResponse = new HttpResponse({ body: [] });
        observ.next(httpResponse);
        observ.complete();
      });

      spyOn(service, 'getUserByUsername').and.returnValue(obs);
      tick();

      app.onSubmit();

      expect(service.getUserByUsername).toHaveBeenCalledTimes(1);
      expect(app.name).toEqual('User Not Found');
      expect(app.todoList.length).toEqual(0);
      expect(app.doneList.length).toEqual(0);
    }));

    it('found user should call getTasksByUserId', fakeAsync(() => {

      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const app = fixture.componentInstance;

      const getUserByUsername = new Observable<HttpResponse<User[]>>(observ => {
        const user = new User(1, 'kaweel');
        const userResponse: User[] = [user];
        const httpResponse = new HttpResponse({ body: userResponse });
        observ.next(httpResponse);
        observ.complete();
      });

      const getTasksByUserId = new Observable<HttpResponse<Task[]>>(observ => {
        const task = new Task(1, 1, 'first task', false);
        const taskResponse: Task[] = [task];
        const httpResponse = new HttpResponse({ body: taskResponse });
        observ.next(httpResponse);
        observ.complete();
      });

      spyOn(service, 'getUserByUsername').and.returnValue(getUserByUsername);
      spyOn(service, 'getTasksByUserId').and.returnValue(getTasksByUserId);
      tick();

      app.onSubmit();

      expect(service.getUserByUsername).toHaveBeenCalledTimes(1);
      expect(service.getTasksByUserId).toHaveBeenCalledTimes(1);
      expect(app.name).toEqual('kaweel');
      expect(app.todoList.length).toEqual(1);
      expect(app.doneList.length).toEqual(0);
    }));

  });


});
