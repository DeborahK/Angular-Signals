import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
      <h1>Shopping Cart</h1>
      <select class="select" (change)="onSelectedVehicle($event.target)">
        <option value="" disabled selected>--Select a vehicle--</option>
        @for(vehicle of vehicles(); track vehicle) {
          <option [value]='vehicle.id'>{{ vehicle.name }}</option>
        }
      </select>
      <div>Quantity: <input type='number' [(ngModel)]='quantity' ></div>
      <div>Vehicle: {{ selectedVehicle()?.name }}</div>
      <div>Price: {{ selectedVehicle()?.price }}</div>
      <div [style.color]='color()'>Total: {{ total() }}</div>
      <br/>
      <div><button (click)='addToList()'
            [disabled]='disableButton()'>Add to List</button></div>
      <br/>
      @for (item of cart(); track item) {
        <div>{{ item.vehicle.name }}: {{item.quantity}}</div>
      } @empty {
        <div>No vehicles in cart</div>
      }
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cartApp';

  // Signals to support the template
  quantity = signal<number>(1);
  selectedVehicle = signal<Vehicle | undefined>(undefined); 
  cart = signal<CartItem[]>([]);

  vehicles = signal<Vehicle[]>([
    { id: 1, name: 'AT-AT', price: 10050 },
    { id: 2, name: 'Sand Crawler', price: 22050 },
    { id: 3, name: 'TIE Fighter', price: 55000 }
  ]);

  // React to changes and recompute
  total = computed(() => (this.selectedVehicle()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 50000 ? 'green' : 'blue');
  disableButton = computed(() => this.quantity() <1);

  addToList() {
    const v = this.selectedVehicle();
    if (v) {
      // Push the vehicle into the array
      this.cart().push({
        vehicle: v,
        quantity: this.quantity()
      });
    }
  }

  onSelectedVehicle(ele: EventTarget | null) {
    // Get the id from the element
    const id = Number((ele as HTMLSelectElement).value);
    // Find the vehicle in the array
    const foundVehicle = this.vehicles().find((v) => v.id === id);

    // Set it as the selected vehicle
    if (foundVehicle) {
      this.selectedVehicle.set(foundVehicle);
    }
  }

  // React to changes and execute code
  qtyEff = effect(() => console.log('quantity:', this.quantity()));
  cartEff = effect(() => console.log('cart:', JSON.stringify(this.cart())));
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
