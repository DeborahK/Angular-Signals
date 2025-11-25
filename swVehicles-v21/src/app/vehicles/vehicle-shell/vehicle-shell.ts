import { Component } from '@angular/core';
import { VehicleList } from "../vehicle-list/vehicle-list";
import { VehicleDetail } from "../vehicle-detail/vehicle-detail";
import { CartTotal } from '../../cart/cart-total/cart-total';

@Component({
    selector: 'sw-vehicle-shell',
    template: `
    <div class='row'>
      <div class='col-md-6'>
        <sw-vehicle-list/>
      </div>
    </div>
    <div class='row'>
      <div class='col-md-6'>
        <sw-vehicle-detail/>
      </div>
      <div class='col-md-6'>
        <sw-cart-total/>
      </div>
    </div>
  `,
    imports: [VehicleList, VehicleDetail, CartTotal]
})
export class VehicleShell {

}
