"use strict"

//const Gpio = require('onoff').Gpio
const Gpio = require('pigpio').Gpio
//const Gpio = require('../onoff').Gpio

class Door {
    constructor(config) {
        this.name      = config.name
        this.desc      = config.desc
        this.buttonPin = config.buttonPin
        this.statusPin = config.statusPin

        //this._button    = new Gpio(this.buttonPin, 'out')
        //this._status    = new Gpio(this.statusPin, 'in')
        this._button    = new Gpio(this.buttonPin, {mode: Gpio.OUTPUT})
        this._status    = new Gpio(this.statusPin, {
		mode: Gpio.INPUT, 
		pullUpDown:Gpio.PUD_UP
	})
	//this._button.writeSync(1)
    }

    pushButton() {
        // close door button circuit
        //this._button.writeSync(0)
        this._button.digitalWrite(0)

        // wait for 200ms before reverting back to open circuit
        //setTimeout(() => { this._button.writeSync(1) }, 500)
        setTimeout(() => { this._button.digitalWrite(1) }, 500)
    }

    isClosed() {
        //return this._status.readSync()
        return this.isOpened()
    }

    isOpened() {
        return this._status.digitalRead()
    }

}

class Doors {
    constructor(config) {
        this.doors = config.doors.map(doorConfig => new Door(doorConfig))
    }

    pushButtonForDoorId(id) {
        const door = this.doors[id]
        door.pushButton();
    }

    getStatusForDoorId(id) {
        const door = this.doors[id]

        return {
            name: door.name,
            open: door.isOpened()
        }
    }

    getAllStatus() {
        return this.doors.map((door, id) => this.getStatusForDoorId(id))
    }

    getDoors() {
        return this.doors.map((door, id) => {
            return {
                id,
                name: door.name,
                desc: door.desc
            }
        })
    }
}

module.exports = Doors
