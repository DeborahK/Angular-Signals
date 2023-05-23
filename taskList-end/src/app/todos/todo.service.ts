import { Injectable, effect, inject, signal } from '@angular/core';
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

  // When the selected user (userId) changes, get the user's tasks
  userTasks = signal<ToDo[]>([]);
  private userTasks$ = toObservable(this.userService.selectedUserId).pipe(
    switchMap(userId => this.http.get<ToDo[]>(this.todoUrl + userId).pipe(
      tap(tasks => this.userTasks.set(tasks))
    )),
    catchError(() => of([] as ToDo[])) //  on any error, just return an empty array
  );
  readOnlyUserTasks = toSignal(this.userTasks$, { initialValue: [] as ToDo[] });

  // tasksEffect = effect(() => {
  //   this.userTasks.set(this.readOnlyUserTasks())
  // }, { allowSignalWrites: true });

  // Mark the task completed
  markComplete(task: ToDo) {
    // this.userTasks.update(tasks => tasks.map(t =>
    //   t.id === task.id ? { ...t, completed: true } : t)
    // );
    this.userTasks.mutate(() => task.completed = true)
  }
}
