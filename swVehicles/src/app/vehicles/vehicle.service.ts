import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { Vehicle, VehicleResponse } from './vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private url = 'https://swapi.py4e.com/api/vehicles';

  http = inject(HttpClient);

  // First page of vehicles
  // Optionally, don't expose this publically.
  private vehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
    map((data) => data.results),
    catchError(this.handleError)
  );

  // Expose the Observable as a signal
  vehicles = fromObservable(this.vehicles$);
  errorMessage = signal('');

  // Could use a BehaviorSubject or Signal
  // Using a BehaviorSubject requires less context switching:
  // RxJS -> signals, instead of signals -> RxJS -> signals
  //
  // This would normally emit the Id of the selected vehicle
  // But this API does not provide a way to search by Id
  private vehicleSelectedSubject = new BehaviorSubject<string>('');

  // Optionally don't expose this publically.
  selectedVehicle$ = this.vehicleSelectedSubject.pipe(
    switchMap((vehicleName) =>
      vehicleName.length
        ? this.http
            .get<VehicleResponse>(`${this.url}?search=${vehicleName}`)
            .pipe(
              map((data) => data.results[0]),
              // Fill in a random price for any missing the price
              // (We can't modify the backend in this demo)
              map(
                (v) =>
                  ({
                    ...v,
                    cost_in_credits: isNaN(Number(v.cost_in_credits))
                      ? String(Math.random() * 100000)
                      : v.cost_in_credits,
                  } as Vehicle)
              ),
              catchError(this.handleError)
            )
        : of(null)
    )
  );
  selectedVehicle = fromObservable(this.selectedVehicle$);

  vehicleSelected(vehicleName: string) {
    this.vehicleSelectedSubject.next(vehicleName);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    // Set the error signal.
    // NOTE: This assumes this service will only generate one error at a time,
    // overwriting any existing error messages
    this.errorMessage.set(errorMessage);
    return throwError(() => errorMessage);
  }
}

// This is only required because these methods are not currently available
/** crude implementation, for sample use only */
export function fromSignal<T>(s: Signal<T>): Observable<T> {
  return new Observable((subscriber) => {
    const ref = effect(() => {
      subscriber.next(s());
    });
    /** clean up the effect once the observable is done. */
    return () => ref.destroy();
  });
}

/** even worse implementation.  */
export function fromObservable<T>(o: Observable<T>): Signal<T> {
  const result = signal(undefined as unknown as T); // not the proper way 😇
  o.subscribe((val) => result.set(val)); // will live forever!
  return result;
}
