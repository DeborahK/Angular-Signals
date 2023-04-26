import { Component, computed } from '@angular/core';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { CartService } from 'src/app/cart/cart.service';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'sw-vehicle-detail',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe],
  templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent {
  errorMessage = '';

  // Signals used in the template
  vehicle = this.vehicleService.selectedVehicle;
  vehicleFilms = this.vehicleService.vehicleFilms;
  pageTitle = computed(() => this.vehicle() ? `Detail for: ${this.vehicle()?.name}` : '');

  constructor(private vehicleService: VehicleService,
    private cartService: CartService) { }

  addToCart(vehicle: Vehicle | undefined) {
    if (vehicle) {
      this.cartService.addToCart(vehicle);
    }
  }
}
