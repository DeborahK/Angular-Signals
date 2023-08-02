import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'sw-vehicle-detail',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, DecimalPipe],
  templateUrl: './vehicle-detail.component.html'
})
export class VehicleDetailComponent {
  errorMessage = '';
  cartService = inject(CartService);
  vehicleService = inject(VehicleService);

    vehicle$ = this.vehicleService.selectedVehicle$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  pageTitle$ = this.vehicle$.pipe(
    map(vehicle => vehicle ? `Detail for: ${vehicle.name}` : '')
  )

  vehicleFilms$ = this.vehicleService.vehicleFilms$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  addToCart(vehicle: Vehicle) {
    this.cartService.addToCart(vehicle);
  }
}
