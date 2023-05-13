import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { ToDo } from './todo';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // Inject the HttpClient service
  http = inject(HttpClient);
  userService = inject(UserService);
  todoUrl = 'https://jsonplaceholder.typicode.com/todos?userId=';

  // When the selectedUserName changes, get the user's tasks
  userTasks = signal<ToDo[]>([]);
  userTasks$ = toObservable(this.userService.selectedUserId).pipe(
    switchMap(userId => this.http.get<ToDo[]>(this.todoUrl + userId).pipe(
      tap(tasks => this.userTasks.set(tasks))
    )),
    catchError(() => of([] as ToDo[])) //  on any error, just return an empty array
  );
  readOnlyUserTasks = toSignal(this.userTasks$, { initialValue: [] as ToDo[] });

  // Mark the task completed
  markComplete(task: ToDo) {
    this.userTasks.update(tasks => tasks.map(t =>
      t.id === task.id ? { ...t, completed: true } : t)
    );
  }
}
