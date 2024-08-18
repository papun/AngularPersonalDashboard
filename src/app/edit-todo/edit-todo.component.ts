import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../shared/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../shared/todo.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent implements OnInit {
  todo?: Todo;
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,  // Imported NotificationService from shared folder
  ) {}
  ngOnInit(): void {
    const todoId = this.route.snapshot.params['id'];
    this.todo = this.todoService.getTodo(todoId)!;
  
  }
  onFormSubmit(form: NgForm) {
    if (!form.valid) return;
    this.todoService.updateTodo(this.todo?.id!, form.value);
    this.router.navigateByUrl('/todos');
    this.notificationService.show('Todo updated successfully');  // Show success notification after update.  // Imported NotificationService from shared folder.
  }
}
