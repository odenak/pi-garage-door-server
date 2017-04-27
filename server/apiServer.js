/* eslint no-console: 0 */
"use strict";

const config = require('./config.json')
const Doors = require('./Doors')
const doors = new Doors(config)

function getAllStatus(req, res) {
    res.status(200)
        .type('application/json')
        .send(doors.getAllStatus())
}

function pushButtonForDoor(req, res) {
    const doorId = req.params.id
    doors.pushButtonForDoorId(doorId)
    getAllStatus(req, res)
}

module.exports = {
    getAllStatus,
    pushButtonForDoor,
}
