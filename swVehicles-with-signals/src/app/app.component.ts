import { Component, computed } from '@angular/core';

import { CartService } from './cart/cart.service';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Star Wars Vehicle Sales';

  cartCount = computed(() => this.cartService.cartItems().reduce(
    (acc, item) => acc + item.quantity, 0));

  constructor(private cartService: CartService) {}
}
