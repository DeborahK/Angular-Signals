import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sw-filter',
  imports: [ FormsModule ],
  template: `
    <div class='card-body'>
      <div class='row'>
        <div class='col-sm-3'>Filter by:</div>
        <div class='col-sm-2'>
          <input type='text'
                [(ngModel)]='filter' />
        </div>
      </div>
    </div>
  `
})
export class FilterComponent {
  filter = model.required();
}
