const request = require('postman-request');

const mapboxAPIkey = "pk.eyJ1IjoibXJ3aWxseWJlZSIsImEiOiJja3A0NWZkaHIwN3ByMnVueG5jbXZ1cHoyIn0.fv8EiD1k3jh8wkZIgWeatA"

const geocode = (address, callback) => {
  const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxAPIkey}&limit=1`;

  request({ uri, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services')
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.')
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        placeName: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode;