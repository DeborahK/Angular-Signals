import { Component } from '@angular/core';
import { map, tap } from 'rxjs';

import { CartService } from './cart/cart.service';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Star Wars Vehicle Sales';

  cartCount$ = this.cartService.cartItems$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  constructor(private cartService: CartService) {}
}
