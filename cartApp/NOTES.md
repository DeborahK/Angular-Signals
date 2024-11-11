# Creating and Reading a Signal
> [OPEN: new project: cartApp]
> [CTRL+SHIFT+V]
## Task 1: Declare a simple signal
```
// Simple signal
// Type can be inferred.
quantity = signal<number>(1);
```
```
// Bind it in the UI
// Change the template to inline
  template: `
    <h1>Shopping Cart</h1>
    <div>Quantity: <input type='number' [(ngModel)]='quantity' ></div>
  `,
```
```
// Import FormsModule
  imports: [RouterOutlet, FormsModule],
```
>[RUN]

## Task 2: Use an Effect
```
  // React to changes and execute code
  qtyEff = effect(() => console.log('quantity:', this.quantity()));
```

## Task 3: Declare a signal containing an object
```
// Define the interface for the type
export interface Vehicle {
  id: number;
  name: string;
  price: number;
}
```
```
// Declare the signal
  selectedVehicle = signal<Vehicle>({ id: 1, name: 'AT-AT', price: 10050});
```
```
// Display it in the UI
    <div>Vehicle: {{ selectedVehicle().name }}</div>
    <div>Price: {{ selectedVehicle().price }}</div>
```
## Task 4: Declare a signal that is an array
```
// Define the interface for the type
export interface CartItem {
  vehicle: Vehicle;
  quantity: number;
}
```
```
// Declare the signal
  cart = signal<CartItem[]>([]);
```

## Task 5: Use an effect to log a signal
```
  // React to changes and execute code
  cartEff = effect(() => console.log('cart:', JSON.stringify(this.cart())));
```

## Task 6: Add an item to that array
```
// Add an "Add to List" button
    <div><button (click)='addToList()'>Add to List</button></div>
```
```
// Define a method that adds a vehicle to the array
  addToList() {
    // Push the vehicle into the array
    this.cart().push({
      vehicle: this.selectedVehicle(),
      quantity: this.quantity()
    });
  }
```
>[Why didn't that work????]

## Task 7: Update a Signal
```
  // Update the signal
  // Treat as immutable
  addToList() {
    // Update a signal given the current value of the signal
    // Use the spread operator to create a copy
    this.cart.update(c =>[...c, {
      vehicle: this.selectedVehicle(),
      quantity: this.quantity()
    }]);
  }
```

## Task 8: Display the array signal in the UI
```
    // Display the cart
    // Uses the new control flow template syntax
    <br/>
    @for (item of cart(); track item) {
      <div>{{ item.vehicle.name }}: {{item.quantity}}</div>
    } @empty {
      <div>No vehicles in list</div>
    }
```

## Task 9: Code reacts to those notifications *when possible*
```
    // Set the quantity signal
    // When the signal changes, it provides notification
    // But not until the UI has an opportunity to re-render  
    this.quantity.set(0);
    this.quantity.set(5);
    this.quantity.set(42);
```
> [What will we see in the console?]
> [COMMENT IT OUT!!]

## Task 10: Declare a computed property
```
  // React to changes and recompute
  total = computed(() => this.selectedVehicle().price * this.quantity());
```
```
  // Display in the UI (before the button)
  <div>Total: {{ total() }}</div>
```

## Task 11: Declare a computed property for styles
```
  // React to changes and recompute
  // Ternary operator
  color = computed(() => this.total() > 50000 ? 'green' : 'blue');
```
```
  // Modify the UI
    <div [style.color]='color()'>Total: {{ total() }}</div>
```

## Task 12: Declare a computed property for UI elements
```
  // React to changes and recompute
  disableButton = computed(() => this.quantity() <1);
```
```
  // Modify the UI
  <button (click)='addToList()'
   [disabled]='disableButton()'>Add to List</button>
```

## Task 13: Modifying a selection
```
  // Define an array of vehicles
    vehicles = signal<Vehicle[]>([
    { id: 1, name: 'AT-AT', price: 10050 },
    { id: 2, name: 'Sand Crawler', price: 22050 },
    { id: 3, name: 'TIE Fighter', price: 55000 }
  ])
```
```
  // Display them in a select box
  <select class="select" (change)="onSelectedVehicle($event.target)">
    <option value="" disabled selected>--Select a vehicle--</option>
    @for(vehicle of vehicles(); track vehicle) {
      <option [value]='vehicle.id'>{{ vehicle.name }}</option>
    }
  </select>
```
```
  // On selection, change the selected vehicle
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
```

1. Pick a vehicle
2. Set the quantity
3. Add to list
4. Select a different vehicle

>[What happens to the quantity when we change the vehicle?]

## Task 14: linkedSignal (primitive)
```
 // We want our signal to change when the selected vehicle changes
  quantity = computed(() => {
    if (this.selectedVehicle()) {
      return 1;
    }
    return 0;
  });
```

> [OOPS! What happened? Check the browser console]

```
 // Use a linkedSignal instead
 // NOTE: Code needs to move BELOW selectedVehicle
  quantity = linkedSignal({
    source: this.selectedVehicle,
    computation: () => 1
  });
```
