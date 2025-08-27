import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { VehicleService } from '../vehicle.service';
import { FilmService } from '../../films/film.service';

@Component({
  selector: 'sw-vehicle-detail',
  imports: [DecimalPipe],
  templateUrl: './vehicle-detail.html'
})
export class VehicleDetail {
  private vehicleService = inject(VehicleService);
  private filmService = inject(FilmService);

  // Signals used in the template
  vehicle = this.vehicleService.selectedVehicle;
  pageTitle = computed(() => this.vehicle() ? `Detail for: ${this.vehicle()?.name}` : '');

  vehicleFilms = this.filmService.vehicleFilmsResource.value;
  error = this.filmService.vehicleFilmsResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');
}
