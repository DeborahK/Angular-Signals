import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
      <h1>Shopping Cart</h1>
      <select [(ngModel)]="selectedVehicle">
        <option [ngValue]="undefined" disabled selected>--Select a vehicle--</option>
        @for(vehicle of vehicles(); track vehicle) {
          <option [ngValue]="vehicle">{{ vehicle.name }}</option>
        }
      </select>
      <div>Quantity: <input type='number' [(ngModel)]='quantity' ></div>
      <div>Vehicle: {{ selectedVehicle()?.name }}</div>
      <div>Price: {{ selectedVehicle()?.price }}</div>
      <div [style.color]='color()'>Total: {{ total() }}</div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cartApp';

  // Signals to support the template
  quantity = signal<number>(1);
  selectedVehicle = signal<Vehicle | undefined>(undefined); 

  vehicles = signal<Vehicle[]>([
    { id: 1, name: 'AT-AT', price: 10050 },
    { id: 2, name: 'Sand Crawler', price: 22050 },
    { id: 3, name: 'TIE Fighter', price: 55000 }
  ]);

  // React to changes and recompute
  total = computed(() => (this.selectedVehicle()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 50000 ? 'green' : 'blue');
  disableButton = computed(() => this.quantity() <1);

  // React to changes and execute code
  qtyEff = effect(() => console.log('quantity:', this.quantity()));
}

export interface Vehicle {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  vehicle: Vehicle;
  quantity: number;
}
