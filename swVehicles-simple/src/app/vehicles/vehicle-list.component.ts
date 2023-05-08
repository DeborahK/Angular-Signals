import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import {  VehicleService } from './vehicle.service';

@Component({
  selector: 'sw-vehicle-list',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './vehicle-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  // errorMessage = signal('');
  errorMessage = '';

  vehicleService = inject(VehicleService);

  // Component signals
  vehicles = computed(() => {
    try {
      return this.vehicleService.vehicles();
    } catch (e) {
      this.errorMessage = typeof e === 'string'? e : 'Error';
      // this.errorMessage.set(typeof e === 'string'? e : 'Error');
      // console.log(this.errorMessage());
      return [];
    }
  });
  selectedVehicle = this.vehicleService.selectedVehicle;

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
