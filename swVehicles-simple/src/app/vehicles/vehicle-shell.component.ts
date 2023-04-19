import { Component } from '@angular/core';
import { VehicleListComponent } from "./vehicle-list.component";
import { VehicleDetailComponent } from "./vehicle-detail.component";
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'sw-vehicle-shell',
  standalone: true,
  template: `
  <div class='row'>
    <div class='col-md-3'>
        <sw-vehicle-list></sw-vehicle-list>
    </div>
    <div class='col-md-9'>
      <div class='row'>
         <sw-vehicle-detail></sw-vehicle-detail>
      </div>
      <div class='row'>
         <sw-cart></sw-cart>
      </div>
    </div>
</div>
  `,
  imports: [VehicleListComponent, VehicleDetailComponent, CartComponent]
})
export class VehicleShellComponent {

}
