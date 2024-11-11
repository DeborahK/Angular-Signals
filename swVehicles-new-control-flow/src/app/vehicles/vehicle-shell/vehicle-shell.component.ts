import { Component } from '@angular/core';
import { VehicleListComponent } from "../vehicle-list/vehicle-list.component";
import { VehicleDetailComponent } from "../vehicle-detail/vehicle-detail.component";

@Component({
  selector: 'sw-vehicle-shell',
  standalone: true,
  template: `
  <div class='row'>
    <div class='col-md-4'>
        <sw-vehicle-list></sw-vehicle-list>
    </div>
    <div class='col-md-8'>
        <sw-vehicle-detail></sw-vehicle-detail>
    </div>
</div>
  `,
  imports: [VehicleListComponent, VehicleDetailComponent]
})
export class VehicleShellComponent {

}
