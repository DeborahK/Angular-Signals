import { Component, inject } from '@angular/core';
import { DecimalPipe, NgIf } from '@angular/common';

import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-total',
  standalone: true,
  imports: [DecimalPipe, NgIf],
  templateUrl: './cart-total.component.html'
})
export class CartTotalComponent {
  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

  subTotal = this.cartService.subTotal;

  deliveryFee = this.cartService.deliveryFee;

  tax = this.cartService.tax;

  totalPrice = this.cartService.totalPrice;
  
}
