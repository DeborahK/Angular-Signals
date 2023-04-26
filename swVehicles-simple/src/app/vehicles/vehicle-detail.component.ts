import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'sw-vehicle-detail',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe],
  templateUrl: './vehicle-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleDetailComponent {
  vehicleService = inject(VehicleService);
  cartService = inject(CartService);

  vehicle = this.vehicleService.selectedVehicle;

  pageTitle = computed(() =>
    this.vehicle() ? `Detail for: ${this.vehicle()?.name}` : null
  );

  addToCart(vehicle: Vehicle) {
    this.cartService.addToCart(vehicle);
  }
}
