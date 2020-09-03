const rls = require('readline-sync');

/**
 * Allows us to interact with the user via the console
 */
class ConsoleService {
  constructor(maxCapacity) {
    this.MAX_SODA_CAPACITY = maxCapacity;
  }

  getNewSodaInfo() {
    // Ask the user for soda type
    let name = rls.question("Please enter the name of the soda: ");
    let amount = parseInt(rls.question("Please enter the amount of sodas to load (between 1 and 25 sodas): "));

    // Re-ask for the amount if an invalid amount is entered
    while (amount <= 0 || amount > this.MAX_SODA_CAPACITY || typeof amount !== "number") {
      amount = parseInt(rls.question("Please enter the amount of sodas to load (between 1 and 25 sodas): "));
    }

    return {
      name: name,
      amount: amount
    };
  }

  giveUserSoda(soda) {
    if (soda && soda.amount && soda.amount > 0) {
      console.log("Here's your soda!");
      console.log(soda.name + " has been vended, new amount is: " + soda.amount);
    } else {
      console.log("Sorry, " + soda.name + " is sold out.");
    }
  }

  // Determine if the user wants to be in load or vending mode
  getModeChoice() {
    let loadOption = -1; // Represents the option chosen from this menu
    while (loadOption !== 1 && loadOption !== 2) {
      loadOption = parseInt(
        rls.question("Enter 1 to load a new soda or 2 if ready to vend. ")
      );
    }
    return loadOption;
  }

  // Takes in a machine object and gets a valid choice from the machine
  // (Assumes that the machine has at least one soda type loaded in the machine)
  getVendChoice(machine) {
    machine.listSodas(); // Prints out the list of valid sodas

    let loadOption = -1; // Represents the option chosen from this menu
    while (loadOption < 0 || loadOption > machine.storage.length) {
      loadOption = parseInt(
        rls.question("Please enter your soda choice (enter 0 to quit): ")
      );
    }
    return loadOption;
  }
}

module.exports = ConsoleService;
