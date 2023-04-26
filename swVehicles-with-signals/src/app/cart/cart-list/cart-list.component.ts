import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { CartService } from '../cart.service';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'sw-cart-list',
  standalone: true,
  template: `
  <div *ngFor="let item of cartItems()">
     <sw-cart-item [item]='item'></sw-cart-item>
  </div>
  `,
  imports: [NgFor, CartItemComponent]
})
export class CartListComponent {
  cartItems = this.cartService.cartItems;

  constructor(private cartService: CartService) { }
}
