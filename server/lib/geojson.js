module.exports.createObjects = function(objects){
  const geos = [];
  objects.forEach((obj) => {
    if(obj.posx!=null){
      geos.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [obj.posx, obj.posy]
        },
        properties: obj
      });
    }
  })
  return geos;
}

module.exports.createGeoJson = function(objects) {
  return {
    type: "FeatureCollection",
    features: objects,
  };
}