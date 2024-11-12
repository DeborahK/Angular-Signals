# Creating and Reading a Signal
> [OPEN: new project: cartApp]
> [CTRL+SHIFT+V]
## Task 1: Declare a simple signal
- quantity
  - signal is a primative
  - type can be inferred
- UI
  - displayed using ngModel in the template
>[RUN]

## Task 2: Use an Effect
- effect
  - Execute code when the signal changes
  - Angular team recommends minimizing their use
  - Great for logging whenever a signal changes

## Task 3: Declare a signal containing an object
- selectedVehicle
  - Generic argument helpful
  - Has to handle undefined/null
- UI
  - Open the box to read the value
  - Dot down into the properties
  - Handle null/undefined

## Task 4: Declare a signal that is an array
- cart
  - Generic argument helpful
- vehicles
  - Generic argument helpful
  - Hardcoded - would get these from an http request
- UI
  - Vehicles in a select box
  - cart items using @for

## Task 5: Use an effect to log a signal
- effect
  - View how the cart appers in the console.

## Task 6: Add an item to that array
- Add an item to an array within a signal
  - Let's try reading the array from the signal
  - Then pushing to that array.
  - Notice in the console that it doesn't display! The signal is not changed.

## Task 7: Update a Signal
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

## Task 8: Display the array signal in the UI
- UI
  - Should display in the UI
  - AND in the console

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
- computed
  - Calculate the total price
  - handle null values

## Task 11: Declare a computed property for styles
- computed
  - Use it for styling

## Task 12: Declare a computed property for UI elements
- computed
  - Use it to control the UI
- everything is declarative!
- easier for unit testing

## Task 13: Modifying a selection
- On selection
  - Use set to replace the value in the signal

1. Pick a vehicle
2. Set the quantity
3. Add to list
4. Select a different vehicle

>[What happens to the quantity when we change the vehicle?]

## Task 14: linkedSignal (primitive)
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
