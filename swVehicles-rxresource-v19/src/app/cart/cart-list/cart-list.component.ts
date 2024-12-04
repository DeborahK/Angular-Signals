import { Component, inject } from '@angular/core';


import { CartService } from '../cart.service';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
    selector: 'sw-cart-list',
    imports: [CartItemComponent],
    templateUrl: 'cart-list.component.html'
})
export class CartListComponent {
  pageTitle = 'Cart';

  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
}
