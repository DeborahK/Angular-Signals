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
// Fix total: Read signal
```
```
// See how it's bound to the input box
```

## Task 2: Use an Effect
```
  // React to changes and execute code
  qtyEff = effect(() => console.log('quantity:', this.quantity()));
```
>[RUN]

## Task 3: Declare a signal containing an object
```
// Declare the signal
  selectedVehicle = signal<Vehicle | undefined>(undefined);
```
```
// See how it's bound to the select box
```
```
// Display the signal values in the UI
    <div>Vehicle: {{ selectedVehicle().name }}</div>
    <div>Price: {{ selectedVehicle().price }}</div>
```
## Task 4: Retrieve data into a signal (experimental!)
```
  // Retrieve data into a signal
  vehiclesResource = httpResource<VehicleResponse>(this.vehicleUrl);
  vehicles = computed(() => this.vehiclesResource.value()?.results);
```
```
// See how it populates the select box
```
>[RUN]

## Task 5: Declare a computed property
```
  // React to changes and recompute
  total = computed(() => this.selectedVehicle().price * this.quantity());
```
```
  // Fix color: Read signal
```
```
  // Display in the UI 
  <div>Total: {{ total() }}</div>
```
>[RUN]

## Task 6: Declare a computed property for styles
```
  // React to changes and recompute
  // Ternary operator
  color = computed(() => this.total() > 50000 ? 'green' : 'blue');
```
```
  // Modify the UI
    <div [style.color]='color()'>Total: {{ total() }}</div>
```
>[RUN]

## Task 7: Get related data when a signal changes
```
  // Automatically re-get data based on a signal
  filmResource = httpResource<Film>(() => 
    this.selectedVehicle()?.films[0]);
  film = this.filmResource.value;
```
```
  // Fix UI: Read the signal
```
