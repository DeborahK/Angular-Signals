import { httpResource } from '@angular/common/http';
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
      <div>Film: {{ film()?.title}}</div>
      <div>Price: {{ selectedVehicle()?.cost_in_credits }}</div>
      <div [style.color]='color()'>Total: {{ total() }}</div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cartApp';

  // This would be in a service
  private vehicleUrl = 'https://swapi.py4e.com/api/vehicles';

  // Signals to support the template
  quantity = signal(1);
  selectedVehicle = signal<Vehicle | undefined>(undefined);

  // Retrieve data into a signal
  vehiclesResource = httpResource<VehicleResponse>(this.vehicleUrl);
  vehicles = computed(() => this.vehiclesResource.value()?.results);

  // Retrieve related data when a signal changes
  filmResource = httpResource<Film>(() =>
    this.selectedVehicle()?.films[0]);
  film = this.filmResource.value;

  // React to changes and recompute
  total = computed(() =>
    (this.selectedVehicle()?.cost_in_credits ?? 0) * this.quantity());
  color = computed(() => this.total() > 50000 ? 'green' : 'blue');

  qtyEffect = effect(() => console.log(this.quantity()));
}

export interface VehicleResponse {
  count: number;
  next: string;
  previous: string;
  results: Vehicle[]
}

export interface Vehicle {
  name: string;
  cost_in_credits: number;
  films: string[];
}

export interface Film {
  title: string;
}
