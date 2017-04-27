"use strict"

// const Gpio = require('onoff').Gpio
const Gpio = require('../onoff').Gpio

class Door {
    constructor(config) {
        this.name      = config.name
        this.desc      = config.desc
        this.buttonPin = config.buttonPin
        this.statusPin = config.statusPin

        this._button    = new Gpio(this.buttonPin, 'out')
        this._status    = new Gpio(this.statusPin, 'in')
    }

    pushButton() {
        // close door button circuit
        this._button.writeSync(0)

        // wait for 200ms before reverting back to open circuit
        setTimeout(() => { this._button.writeSync(1) }, 200)
    }

    isClosed() {
        return this._status.readSync()
    }

    isOpened() {
        return !this.isClosed()
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
