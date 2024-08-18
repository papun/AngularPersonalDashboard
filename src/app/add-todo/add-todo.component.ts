import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent {

  todo?:Todo;
  constructor(private todoService:TodoService,private router:Router,private notificationservice:NotificationService) {}
  onFormSubmit(form: NgForm) {
    if(form.valid){
    this.todo = new Todo(form.value.text);
    console.log(form.value.text);
    this.todoService.addTodo(this.todo!);
    this.router.navigateByUrl('/todos');
    this.notificationservice.show('Todo created successfully');
    }
  }
}
