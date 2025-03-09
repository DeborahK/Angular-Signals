import { HttpClient } from '@angular/common/http';
import { Injectable, ResourceStatus, computed, effect, inject, signal } from '@angular/core';
import { delay, forkJoin, map, of, shareReplay } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Film, Vehicle, VehicleResponse } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private url = 'https://swapi.py4e.com/api/vehicles';
  private http = inject(HttpClient);

  // First page of vehicles
  // If the price is empty, randomly assign a price
  // (We can't modify the backend in this demo)
  private vehicles$ = this.http.get<VehicleResponse>(this.url).pipe(
    map((data) =>
      data.results.map((v) => ({
        ...v,
        cost_in_credits: isNaN(Number(v.cost_in_credits))
          ? String(Math.random() * 100000)
          : v.cost_in_credits,
      }) as Vehicle)
    ),
    shareReplay(1),
    delay(2000)
  );

  // Issue the HTTP request when this service is loaded
  vehiclesResource = rxResource({
    loader: () => this.vehicles$
  });

  // Expose signals from this service
  vehicles = computed(() => this.vehiclesResource.value() ?? [] as Vehicle[]);
  selectedVehicle = signal<Vehicle | undefined>(undefined);

  private vehicleFilmsResource = rxResource({
    request: () => this.selectedVehicle(),
    loader: ({ request: vehicle }) => {
      if (vehicle) {
       return forkJoin(vehicle.films.map(link =>
        this.http.get<Film>(link)));
      }
      return of([] as Film[]);
    }
  });
  vehicleFilms = computed(() => this.vehicleFilmsResource.value() ?? [] as Film[]);

  // When the user selects a vehicle by name,
  // Locate it in the array and set it into the signal
  vehicleSelected(vehicleName: string) {
    const foundVehicle = this.vehicles().find((v) => v.name === vehicleName);
    this.selectedVehicle.set(foundVehicle);
  }

  private eff = effect(() => {
    console.log('Status:',ResourceStatus[this.vehiclesResource.status()])
    console.log('Value:', this.vehiclesResource.value())
   });
}
