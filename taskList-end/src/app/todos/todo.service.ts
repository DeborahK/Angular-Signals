import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
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

  // Option 1:
  // Create a writable signal.
  // Use an effect to react to the userId changes
  // Get the data using the parameter
  // Use takeUntilDestroyed() to ensure the Observable is destroyed
  //  when the component is destroyed
  // Subscribe to that Observable
  // In the Observer, set the writable signal.
  userTasks = signal<ToDo[]>([]);  // Writable signal
  destroyRef = inject(DestroyRef); // Current "context" (this component)
  tasksEffect = effect(() =>
    this.http.get<ToDo[]>(this.todoUrl + this.userService.selectedUserId()).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(() => of([] as ToDo[]))
    ).subscribe(
      tasks => this.userTasks.set(tasks)
    )
  );
  
  // Option 2:
  // Create a writable signal.
  // Use an effect to react to the userId changes
  // Get the data using the parameter
  // Use tap to set the writable signal
  // Use takeUntilDestroyed() to ensure the Observable is destroyed
  //  when the component is destroyed
  // Subscribe to that Observable
  userTasks2 = signal<ToDo[]>([]);  // Writable signal
  destroyRef2 = inject(DestroyRef); // Current "context" (this component)
  tasksEffect2= effect(() =>
    this.http.get<ToDo[]>(this.todoUrl + this.userService.selectedUserId()).pipe(
      tap(tasks => this.userTasks2.set(tasks)),
      takeUntilDestroyed(this.destroyRef2),
      catchError(() => of([] as ToDo[]))
    ).subscribe()
  );
  
  // Option 3:
  // Create an Observable from the selectedUserId signal
  // React to emissions, piping the userId through an Observable pipeline
  // Use switchMap to get the data
  // Use toSignal to automatically subscribe and unsubscribe
  private userTasks$ = toObservable(this.userService.selectedUserId).pipe(
    switchMap(userId => this.http.get<ToDo[]>(this.todoUrl + userId).pipe(
      tap(tasks => this.userTasks.set(tasks))
    )),
    catchError(() => of([] as ToDo[])) //  on any error, just return an empty array
  );
  // This signal is not used
  // It's only here to automatically handle the subscribe and unsubscribe.
  readOnlyUserTasks = toSignal(this.userTasks$, { initialValue: [] as ToDo[] });

  // NOTE: A common question is whether the above code would be easier with a computed.
  // Using the HTTP request inside of a computed is NOT recommended.
  // A computed should not cause a side effect, such as issuing an http request.
  // Also, this returns a Signal<Observable<ToDo[]>>
  // userTasksObservable = computed(() =>
  //   this.http.get<ToDo[]>(this.todoUrl + this.userService.selectedUserId()));
  // And you'd need to read the signal and subscribe somewhere:
  // this.userTasksObservable().subscribe(
  //   tasks => this.userTasks.set(tasks)
  // );
  // Subscribing in the computed results in a Signal<Subscription>
  // And won't execute unless the sub signal is read.
  // sub = computed(() => 
  //   this.http.get<ToDo[]>(this.todoUrl + this.userService.selectedUserId()).pipe(
  //     tap(tasks => this.userTasks.set(tasks))
  //   ).subscribe());

  // Mark the task completed
  markComplete(task: ToDo) {
    // Long way:
    // this.userTasks.update(tasks => tasks.map(t =>
    //   t.id === task.id ? { ...t, completed: true } : t)
    // );
    // Short way:
    this.userTasks.mutate(() => task.completed = true)
  }
}
