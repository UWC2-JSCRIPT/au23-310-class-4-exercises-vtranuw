const makeCoffee = (isHot) => {
  const coffee = { isHot: isHot, extras: [] }
  if (isHot) {
    coffee.cup = 'Styrofoam'
  } else {
    coffee.cup = 'paper'
    coffee.extras.push('ice')
  }
  return coffee
}

// Test Cases:
// Test Case 1: Hot coffee
const hotCoffee = makeCoffee(true);
console.log("Hot Coffee:");
console.log("Cup:", hotCoffee.cup); // Should be 'Styrofoam'
console.log("Is Hot:", hotCoffee.isHot); // Should be true
console.log("Extras:", hotCoffee.extras); // Should be an empty array

// Test Case 2: Cold coffee
const coldCoffee = makeCoffee(false);
console.log("\nCold Coffee:");
console.log("Cup:", coldCoffee.cup); // Should be 'paper'
console.log("Is Hot:", coldCoffee.isHot); // Should be false
console.log("Extras:", coldCoffee.extras); // Should contain 'ice'

