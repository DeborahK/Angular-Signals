import { Component, inject, signal } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import {  VehicleService } from './vehicle.service';

@Component({
  selector: 'sw-vehicle-list',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';

  vehicleService = inject(VehicleService);

  vehicles = this.vehicleService.vehicles;
  selectedVehicle = this.vehicleService.selectedVehicle;
  // Better error handling?
  errorMessage = this.vehicleService.errorMessage;

  // When a vehicle is selected, emit the selected vehicle name
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }

  constructor() {
    // This is an empty array because the data is not yet retrieved
    // And the default signal value is an empty array
    console.log("Vehicles:", this.vehicles());
  }

}
