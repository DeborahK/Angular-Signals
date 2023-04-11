import { Vehicle } from "../vehicles/vehicle";

export interface Cart {
  cartItems: CartItem[]
}

export interface CartItem {
  vehicle: Vehicle;
  quantity: number;
}

// You could move this to a shared file
// and reuse it for every entity in the application
type ActionType = 'add' | 'update' | 'delete';

export interface Action<T> {
  item: T;
  action: ActionType;
}
