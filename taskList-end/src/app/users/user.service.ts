import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, takeUntil, tap } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Inject the HttpClient service
  http = inject(HttpClient);
  userUrl = 'https://jsonplaceholder.typicode.com/users';

  // Retrieve the users from the API using RxJS
  private users$ = this.http.get<User[]>(this.userUrl).pipe(
    catchError(() => of([] as User[])) //  on any error, just return an empty array
  );
  
  // Expose the state as a signal
  // NOTE: toSignal creates a readonly signal
  // This example does not need a writable signal
  readOnlyUsers = toSignal(this.users$, {initialValue: [] as User[]});
  selectedUserId = signal(0);

  // If you did need a writable signal:
  // Create the writeable signal
  // Issue the http request
  // Use tap to set the signal from the result
  // Unsubscribe when the component is destroyed
  // Subscribe to issue the http request
  users = signal<User[]>([]);
  private sub = this.http.get<User[]>(this.userUrl).pipe(
    tap(data => this.users.set(data)),
    takeUntilDestroyed(),
    catchError(() => of([] as User[]))
  ).subscribe();

  // Set the selected user
  setSelectedUser(id: number) {
    this.selectedUserId.set(id);
  }
}
