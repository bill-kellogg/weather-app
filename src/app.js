const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDir))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather",
    name: "William"
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    name: "William"
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    name: "William",
    message: "Send help"
  });
})

app.get('/weather', (req, res) => {
  const { address } = req.query;
  
  if (!address) {
    return res.send({
      error: "You must provide a search address"
    })
  }

  geocode(address, (error, {latitude, longitude, placeName} = {}) => {
    if (error) {
      return res.send({ error })
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      
      res.send({placeName, forecastData})
    })
  })
})

app.get('/help/*', (req, res) => {
  res.send('Help article not found.')
})

app.get('*', (req, res) => {
  res.render('404', {
    title: "404 Page Not Found",
    name: "William"
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})