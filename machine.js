const SodaType = require('./sodaType');

// The soda machine will contain sodas and vend them out to users
class SodaMachine {
  constructor(sodaMax) {
    this.storage = [];
    this.MAX_SODA_TYPES = sodaMax;
  }

  // Prints a list of sodas for the user
  listSodas () {
    for (let s = 1; s <= this.storage.length; s++) {
      console.log(`${s}) ${this.storage[s - 1].name}`);
    }
  }

  // Adds a new soda type to the machine.  If the machine is full, return false.
  addSodaType (soda) {
    // If the machine isn't full yet
    if (this.storage.length < this.MAX_SODA_TYPES) {
      // Add the soda to the machine, then return true to indicate success
      this.storage.push(soda);
      return true;
    } else {
      return false; // Return false to let them know it was not added
    }
  }

  /**
   * This should return a soda object from the specified location.
   * @param {number} drinkId The id of the drink we're looking for
   * @param {Array<object>} state The machine state
   * @returns {boolean} A boolean indicating success/failure in the vending process.
   */
  vendSoda (location) {
    let index = location - 1;
    // If it's a valid index and we have soda available
    if (index >= 0 && index < this.storage.length && this.storage[index].amount > 0) {
      this.storage[index].amount--;
      return this.storage[index];
    } else {
      return this.storage[index];
    }
  }
};

module.exports = SodaMachine;