import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../vehicles/vehicle.service';

@Component({
  selector: 'sw-cart-total',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './cart-total.html'
})
export class CartTotal {
  private cartService = inject(CartService);
  private vehicleService = inject(VehicleService);

  // Signals used in the UI
  selectedVehicle = this.vehicleService.selectedVehicle;
  price = this.cartService.price;
  quantity = this.cartService.quantity;

  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;

}
