import { Component, computed, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { VehicleService } from '../vehicle.service';
import { FilterComponent } from '../../filter/filter.component';

@Component({
    selector: 'sw-vehicle-list',
    imports: [NgClass, FilterComponent],
    templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent {
  pageTitle = 'Vehicles';
  errorMessage = '';
  listFilter = signal('e') // Default
  vehicleService = inject(VehicleService);

  // Component signals
  filteredVehicles = computed(() => 
    this.vehicleService.vehicles().filter(v => v.name.includes(this.listFilter())));
  selectedVehicle = this.vehicleService.selectedVehicle;
  isLoading = this.vehicleService.vehiclesResource.isLoading;

  // When a vehicle is selected, set it into the signal
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }

}
