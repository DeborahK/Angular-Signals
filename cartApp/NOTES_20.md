# Creating and Reading a Signal
> [OPEN: new project: cartApp]
> [CTRL+SHIFT+V]
## Task 1: Declare a simple signal
- quantity
  - signal is a primative
  - type can be inferred
- selectedVehicle
  - Generic argument helpful
  - Has to handle undefined/null
- cart
  - Generic argument helpful
- vehicles
  - Generic argument helpful
  - Hardcoded - would get these from an http request

>[RUN]

## Task 2: Display in the UI
- quantity
  - displayed using ngModel in the template
- selectedVehicle
  - Open the box to read the value
  - Dot down into the properties
  - Handle null/undefined
- vehicles and cart
  - Vehicles in a select box
  - cart items using @for

## Task 3: Use an Effect
- effect
  - Execute code when the signal changes
  - Angular team recommends minimizing their use
  - Great for logging whenever a signal changes

## Task 4: Add an item to an array in a signal
- Add an item to an array within a signal
  - Let's try reading the array from the signal
  - Then pushing to that array.
  - Notice in the console that it doesn't display! The signal is not changed.

## Task 5: Update a Signal
- Update a signal using .update
```
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

## Task 6: Declare a computed property
- computed
  - Calculate the total price, handle null values
  - Use it for styling
  - Use it to control the UI
- everything is declarative!
- easier for unit testing

## Task 7: Modifying a selection
- On selection
  - Use set to replace the value in the signal

1. Pick a vehicle
2. Set the quantity
3. Add to list
4. Select a different vehicle

>[What happens to the quantity when we change the vehicle?]

## Task 8: linkedSignal (primitive)
- computed
  - We want our signal to change when the selected vehicle changes

```
  quantity = computed(() => {
    if (this.selectedVehicle()) {
      return 1;
    }
    return 0;
  });
```

> [OOPS! What happened? Check the browser console]

- linkedSignal instead
  - for writable values that can react to changes in a source signal and reset based on a computation
```
 // Use a linkedSignal instead
 // NOTE: Code needs to move BELOW selectedVehicle
  quantity = linkedSignal({
    source: this.selectedVehicle,
    computation: () => 1
  });
```
