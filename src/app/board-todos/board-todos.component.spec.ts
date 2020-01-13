import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTodosComponent } from './board-todos.component';

describe('BoardTodosComponent', () => {
  let component: BoardTodosComponent;
  let fixture: ComponentFixture<BoardTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
