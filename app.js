// Lab 2 Solution
// By E.L. Fridge

const rls = require('readline-sync');
const Machine = require('./machine');
let MAX_SODA_CAPACITY = 25;
let machineMode = getModeChoice();

let machine = new Machine();

// Keep looping as long as we are in loading mode
while (machineMode === 1) {
  // Ask the user for soda type
  let name = rls.question("Please enter the name of the soda: ");
  let amount = parseInt(rls.question("Please enter the amount of sodas to load (between 1 and 25 sodas): "));

  // Re-ask for the amount if an invalid amount is entered
  while (amount <= 0 || amount > MAX_SODA_CAPACITY || typeof amount !== "number") {
    amount = parseInt(rls.question("Please enter the amount of sodas to load (between 1 and 25 sodas): "));
  }
  machine.newSodaType(name, amount);  // Add the soda to the machine
  machine.listSodas();                // Prints out the list of valid sodas
  machineMode = getModeChoice();      // Ask the user again what they want to do
}

console.log("Ready to vend!");          // When we get out this far we must now be ready to vend!
let choice = getVendChoice(machine);    // Ask the user for a valid vending machine choice
while (choice !== 0) {
  let soda = machine.vendSoda(choice);  // Vend the soda
  if (soda.amount > 0) {
    console.log("Here's your soda!");
    console.log(soda.name + " has been vended, new amount is: " + soda.amount);
  } else {
    console.log("Sorry, " + soda.name + " is sold out.");
  }
  choice = getVendChoice(machine);    // Get another choice
}

// Determine if the user wants to be in load or vending mode
function getModeChoice() {
  let loadOption = -1; // Represents the option chosen from this menu
  while (loadOption !== 1 && loadOption !== 2) {
    loadOption = parseInt(rls.question("Enter 1 to load a new soda or 2 if ready to vend. "));
  }
  return loadOption;
}

// Takes in a machine object and gets a valid choice from the machine
// (Assumes that the machine has at least one soda type loaded in the machine)
function getVendChoice(machine) {
  machine.listSodas(); // Prints out the list of valid sodas

  let loadOption = -1; // Represents the option chosen from this menu
  while (loadOption < 0 || loadOption > machine.storage.length) {
    loadOption = parseInt(rls.question("Please enter your soda choice (enter 0 to quit): "));
  }
  return loadOption;
}