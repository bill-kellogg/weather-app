const searchForm = document.querySelector('.search__form');
const errorMsgElem = document.querySelector('.error-message');
const locationElem = document.querySelector('.location');
const currentTempElem = document.querySelector('.current-temp');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const searchInputValue = document.getElementById('weather-search__input').value;
  locationElem.textContent = 'Loading...';

  fetch(`/weather?address=${searchInputValue}`)
    .then(response => response.json())
    .then(data => {
      errorMsgElem.textContent = '';
      locationElem.textContent = '';
      currentTempElem.textContent = '';
      if (data.error) {
        console.log(data.error);
        errorMsgElem.textContent = data.error;
        return;
      }
      locationElem.textContent = "Location: " + data.placeName;
      currentTempElem.textContent = "Current Temp: " + data.forecastData.currentTemperature;
    });
})