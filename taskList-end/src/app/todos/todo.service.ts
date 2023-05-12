import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { ToDo } from './todo';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // Inject the HttpClient service
  http = inject(HttpClient);
  userService = inject(UserService);
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';

  // When the selectedUserName changes, get the user's tasks
  selectedUserTasks$ = toObservable(this.userService.selectedUserId).pipe(
    switchMap(userId => this.http.get<ToDo[]>(`${this.todoUrl}?userId=${userId}`)),
    catchError(() => of([] as ToDo[])) //  on any error, just return an empty array
  );
  selectedUserTasks = toSignal(this.selectedUserTasks$, { initialValue: [] as ToDo[] });

  markComplete(task: ToDo) {
    task.completed = true;
  }
}