export interface VehicleResponse {
  count: number;
  next: string;
  previous: string;
  results: Vehicle[]
}

export interface Vehicle {
  cargo_capacity: number;
  crew: number;
  name: string;
  model: string;
  manufacturer: string,
  cost_in_credits: string
  passengers: number;
  vehicle_class: string;
  films: string[];
  price?: number;
}

export interface Film {
  title: string;
}
