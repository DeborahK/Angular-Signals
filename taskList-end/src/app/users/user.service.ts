import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

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
  users = toSignal(this.users$, {initialValue: [] as User[]});
  selectedUserId = signal(0);

  // Set the selected user
  setSelectedUser(id: number) {
    this.selectedUserId.set(id);
  }
}
