import { Injectable, computed, effect, inject, linkedSignal } from "@angular/core";
import { VehicleService } from "../vehicles/vehicle.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private vehicleService = inject(VehicleService);

  // Manage state with signals
  quantity = linkedSignal({
    source: this.vehicleService.selectedVehicle,
    computation: v => 1
  });
  // quantity = signal(1);

  price = computed(() => this.vehicleService.selectedVehicle()?.cost_in_credits ?? 0);

  // Total before delivery and tax
  subTotal = computed(() => this.quantity() * this.price());

  // Delivery is free if spending more than 100,000 credits
  deliveryFee = computed(() => this.subTotal() < 100000 ? 999 : 0);

  // Tax could be based on shipping address zip code
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  // Total price
  totalPrice = computed(() => this.subTotal() + this.deliveryFee() + this.tax());

  eff = effect(() => console.log('Qty:', this.quantity()));
}
