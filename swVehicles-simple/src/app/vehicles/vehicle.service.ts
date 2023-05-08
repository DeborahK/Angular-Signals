import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Vehicle, VehicleResponse } from './vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private url = 'https://swapi.py4e.com/api/vehicles';

  // Inject any dependencies
  http = inject(HttpClient);

  // First page of vehicles
  private vehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
    map((data) => data.results),
    catchError(this.handleError)
  );

  // Expose the Observable as a signal
  // Provide a default value in case the Observable hasn't emitted yet
  vehicles = toSignal<Vehicle[], Vehicle[]>(this.vehicles$, { initialValue: [] });

  // Could use a BehaviorSubject or Signal
  // Using a BehaviorSubject requires less context switching:
  // RxJS -> signals, instead of signals -> RxJS -> signals
  //
  // This would normally emit the Id of the selected vehicle
  // But this API does not provide a way to search by Id
  private vehicleSelectedSubject = new BehaviorSubject<string>('');

  // Optionally don't expose this publically.
  private selectedVehicle$ = this.vehicleSelectedSubject.pipe(
    filter(Boolean),
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
  selectedVehicle = toSignal(this.selectedVehicle$);

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
    return throwError(() => errorMessage);
  }
}
