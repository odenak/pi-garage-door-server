"use strict"

class Gpio {
    constructor(pin, direction) {
        this.pin       = pin
        this.direction = direction
        this.value     = (Math.random() >= 0.5) ? 1 : 0;
    }

    readSync() {
        console.log(`GPIO readSync pin ${this.pin} : ${this.value}`)
        return this.value
    }

    writeSync(value) {
        console.log(`GPIO writeSync pin ${this.pin} : ${value}`)
        this.value = value
    }
}

module.exports = { Gpio }
