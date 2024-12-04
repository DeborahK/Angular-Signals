import { Component } from '@angular/core';

import { CartListComponent } from "../cart-list/cart-list.component";
import { CartTotalComponent } from "../cart-total/cart-total.component";

@Component({
    imports: [CartListComponent, CartTotalComponent],
    template: `
    <div class='row'>
      <sw-cart-list/>
    </div>
    <div class='row'>
      <div class='offset-md-6 col-md-6'>
        <sw-cart-total/>
      </div>
    </div>
  `
})
export class CartShellComponent {

}
