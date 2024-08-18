import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  animations: [
    trigger('todoItemAnim',[
      transition(':leave',[
        animate(800,style({
          opacity: 0,
          height:0,
          // transform: 'translateY(100px)',
          marginBottom:0
        }))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit {
  todos!: Todo[];

  constructor(private todoService: TodoService, private router: Router,private notificationservice:NotificationService) {}
  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }
  toggleCompleted(todo: Todo) {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed });
    this.notificationservice.show('Todo Status updated Successfully..');
  }

  onEditClicked(todo: Todo) {
    this.router.navigate(['/todos', todo.id]);
  }

  onDeleteClicked(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
    this.notificationservice.show('Todo Deleted Successfully..');

  }
  trackByid(index: any,item:Todo){
    return item.id;
  }
}
