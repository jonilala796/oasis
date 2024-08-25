const lodash = require('lodash')
    , util = require('../lib/util')
    , icons = require('../lib/icons');

function Player(player) {
    const coords = util.calcCoords(player._attributes.x, player._attributes.z);

    this.name = player._text;
    this.uptime = util.calcAndFormatTime(player._attributes.uptime);
    this.admin = player._attributes.isAdmin;
    this.posx = coords.x;
    this.posy = coords.y;
    this.icon = icons.getIcon('farmer');
}

module.exports.getPlayers = function (players) {
    const results = [];
    players.forEach(player => {
        if (!lodash.isEmpty(player)) {
            if (player._attributes.isUsed === "true") {
                results.push(new Player(player));
            }
        }
    });
    return results;
}

module.exports.Player = Player;