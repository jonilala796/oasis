const lodash = require('lodash')
    , util = require('../lib/util')
    , icons = require('../lib/icons');

let mapSize;

module.exports.getVehicles = function (vehicles, map) {
    const results = [];
    mapSize = map;

    if (!Array.isArray(vehicles)) {
        vehicles = [vehicles];
    }

    vehicles.forEach(vehicle => {
        if (!lodash.isEmpty(vehicle)) {
            results.push(new Vehicle(vehicle))
        }
    })
    return results
}

function Vehicle(vehicle) {
    const coords = util.calcCoords(mapSize, vehicle._attributes.x, vehicle._attributes.z);

    this.name = vehicle._attributes.name
    this.posx = coords.x
    this.posy = coords.y
    this.type = vehicle._attributes.type
    this.category = vehicle._attributes.category
    this.icon = icons.getIcon(vehicle._attributes)
    this.popup = icons.getIconPopup(vehicle._attributes)
}

module.exports.Vehicle = Vehicle;