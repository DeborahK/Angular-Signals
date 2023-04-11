import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf, AsyncPipe } from '@angular/common';
import { EMPTY, catchError } from 'rxjs';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'sw-vehicle-list',
  standalone: true,
  imports: [AsyncPipe, NgClass, NgFor, NgIf],
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  errorMessage = '';

  // Vehicles
  vehicles$ = this.vehicleService.vehicles$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      }));

  selectedVehicle$ = this.vehicleService.selectedVehicle$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private vehicleService: VehicleService) { }

  // When a vehicle is selected, emit the selected vehicle name
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }

}
