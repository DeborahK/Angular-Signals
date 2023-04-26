import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';

import { CartService } from './cart.service';
import { CartItem } from './cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sw-cart',
  standalone: true,
  imports: [DecimalPipe, NgIf, NgFor, FormsModule],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  pageTitle = 'Cart';

  // Hard-coded quantity available
  // These could instead come from an inventory system
  qtyAvailable = signal([1, 2, 3, 4, 5, 6, 7, 8]);

  cartService = inject(CartService);

  // Expose the signals from the service
  cartItems = this.cartService.cartItems;
  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;

  // Example of an effect
  x = effect(() => console.log("Cart items:", this.cartItems()));

  onQuantitySelected(item: CartItem, qty: number) {
    this.cartService.updateInCart(item, qty);
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }
}
