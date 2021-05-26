const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=be6990634a4c7f747293d0908e2123cb&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather service')
    } else if (body.error) {
      callback('Unable to find the location. Try another search.')
    } else {
      callback(undefined, {
        currentTemperature: body.current.temperature,
        feelsLike: body.current.feelslike
      })
    }
  });
}

module.exports = forecast