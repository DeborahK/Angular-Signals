import { Vehicle } from "../vehicles/vehicle";

export interface Cart {
  cartItems: CartItem[]
}

export interface CartItem {
  vehicle: Vehicle;
  quantity: number;
}
