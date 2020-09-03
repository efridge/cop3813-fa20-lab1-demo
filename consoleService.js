const rls = require("readline-sync");
const SodaType = require('./sodaType');

/**
 * Allows us to interact with the user via the console
 */
class ConsoleService {
  constructor(maxCapacity) {
    this.MAX_SODA_CAPACITY = maxCapacity;
  }

  /**
   * Gets info needed to create a new soda type from the user
   * @returns {SodaType} The new soda type we've created
   */
  getNewSodaType() {
    // Ask the user for soda type
    let name = rls.question("Please enter the name of the soda: ");
    let amount = parseInt(
      rls.question(
        "Please enter the amount of sodas to load (between 1 and 25 sodas): "
      )
    );

    // Re-ask for the amount if an invalid amount is entered
    while (
      amount <= 0 ||
      amount > this.MAX_SODA_CAPACITY ||
      typeof amount !== "number"
    ) {
      amount = parseInt(
        rls.question(
          "That's not a valid amount. Please enter the amount of sodas to load (between 1 and 25 sodas): "
        )
      );
    }

    return new SodaType(name, amount);
  }

  /**
   * Lets the user know that the machine is full
   * @returns {void}
   */
  alertMachineFull() {
    console.log("Sorry, the machine is full");
  }

  /**
   * Gives the user a soda (virtually,via the console)
   * @param {SodaType} soda The soda to vend
   */
  giveUserSoda(soda) {
    if (soda && soda.amount && soda.amount > 0) {
      console.log("Here's your soda!");
      console.log(
        soda.name + " has been vended, new amount is: " + soda.amount
      );
    } else {
      console.log("Sorry, " + soda.name + " is sold out.");
    }
  }

  /**
   * Determine if the user wants to be in load or vending mode
   * @returns {number} The menu option chosen
   */
  getModeChoice() {
    let userOption = -1; // Represents the option chosen from this menu
    while (userOption !== 1 && userOption !== 2) {
      userOption = parseInt(
        rls.question("Enter 1 to load a new soda or 2 if ready to vend. ")
      );
    }
    return userOption;
  }

  /**
   * Takes in a machine object and gets a valid choice from the machine
   * (Assumes that the machine has at least one soda type loaded in the machine)
   * @returns {number} The menu option chosen
   */
  getVendChoice(machine) {
    machine.listSodas(); // Prints out the list of valid sodas

    let userOption = -1; // Represents the option chosen from this menu
    while (userOption < 0 || userOption > machine.storage.length) {
      userOption = parseInt(
        rls.question("Please enter your soda choice (enter 0 to quit): ")
      );
    }
    return userOption;
  }
}

module.exports = ConsoleService;
