const {Game} = require('./model/game')
    , {Server, Slots} = require('./model/server')
    , {Economy} = require('./model/economy')
;
const {SERVER_IP, SERVER_KEY} = require("../config.server");
const {error} = require("./lib/logger");
const {get} = require("superagent");
const {convert2json} = require("./lib/util");
const {Player, getPlayers} = require("./model/player");
const {Vehicle ,getVehicles} = require("./model/vehicle");

module.exports.getMap = function (cb) {
    get('http://' + SERVER_IP + '/feed/dedicated-server-stats-map.jpg?code=' + SERVER_KEY + '&quality=100&size=2048')
        .end(function (err, map) {
            if (err) {
                error(err);
            }
            cb(map)
        })
}

const getServerStatsXml = function (cb) {
    get('http://' + SERVER_IP + '/feed/dedicated-server-stats.xml?code=' + SERVER_KEY)
        .end(function (err, xml) {
            if (err) {
                error(err);
            }
            const result = convert2json(xml.body);
            cb(result)
        })
};

module.exports.getServerOnly = function (cb) {
    getServerStatsXml((result) => {
        cb(new Server(result.Server))
    })
}

module.exports.getEntities = function (cb) {
    getServerStatsXml((result) => {
        cb({
            server: new Server(result.Server),
            slots: new Slots(result.Server.Slots._attributes),
            players: getPlayers(result.Server.Slots.Player),
            vehicles: getVehicles(result.Server.Vehicles.Vehicle, result.Server._attributes.mapSize)
        })
    })
}

module.exports.getSavegame = function (cb) {
    get('http://' + SERVER_IP + '/feed/dedicated-server-savegame.html?code=' + SERVER_KEY + '&file=careerSavegame')
        .end(function (err, xml) {
            if (err) {
                error(err);
            }
            const result = convert2json(xml.body);
            cb(new Game(result.careerSavegame))
        })
}

module.exports.getEconomy = function (cb) {
    get('http://' + SERVER_IP + '/feed/dedicated-server-savegame.html?code=' + SERVER_KEY + '&file=economy')
        .end(function (err, xml) {
            if (err) {
                error(err);
            }
            const result = convert2json(xml.body);
            cb(new Economy(result.economy))
        })
}