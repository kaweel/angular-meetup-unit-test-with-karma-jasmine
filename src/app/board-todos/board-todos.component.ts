import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../model/taks';

@Component({
  selector: 'app-board-todos',
  templateUrl: './board-todos.component.html',
  styleUrls: ['./board-todos.component.scss']
})
export class BoardTodosComponent implements OnInit {

  @Input() todoList: Array<Task>;
  @Input() doneList: Array<Task>;

  constructor() { }

  ngOnInit() {
  }

}
