import { httpResource } from '@angular/common/http';
import { Injectable, effect, signal } from '@angular/core';
import { Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private url = 'api/vehicles';

  // Expose signals from this service
  selectedVehicle = signal<Vehicle | undefined>(undefined);

  // Retrieve data with httpResource: simpliest/most flexible
  vehiclesResource = httpResource<Vehicle[]>(() => this.url, {defaultValue: []});

  // Accessing the resource generates an error if the http request fails
  private eff = effect(() => {
    if (!this.vehiclesResource.error()) {
      console.log('Vehicles', JSON.stringify(this.vehiclesResource.value()));
    } else {
      console.error('Failed to load vehicles', this.vehiclesResource.error()?.message);
    }
  });

}
