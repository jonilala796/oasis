const express = require('express')
    , router = express.Router()
    , api = require('../api')
    , Geo = require('../lib/geojson');

router.get('/map.jpg', function (req, res) {
  api.getMap((map) => {
    res.set({ 'Content-Type': 'image/png' });
    res.send(map.body);
  })
})

router.get('/geo.json', function (req, res) {
  api.getEntities((entities) => {
    const objects = [...Geo.createObjects(entities.players), ...Geo.createObjects(entities.vehicles)];
    res.json(Geo.createGeoJson(objects));
  })
})

module.exports = router;