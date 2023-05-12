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
  
  // Expose the state as a signal

  // Set the selected user
}
