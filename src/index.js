function currentDate(timestamp) {
  let now = new Date(timestamp);

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = days[now.getDay()];
  return `${today} ${hours}:${minutes}`;
}

currentDate();

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let forecastDay = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[forecastDay];
}

//Changing HTML
function updateForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#future-forecast");
  forecastHTML = `<div class="row">`;
  forecast.forEach(function (eachDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm">
                <h4 class="forecast-day">
                  ${formatForecastDay(eachDay.dt)}
                </h4>
                <img src="http://openweathermap.org/img/wn/${
                  eachDay.weather[0].icon
                }@2x.png" alt="${
          eachDay.weather[0].description
        }" class="forecast-icon"/>
                <div class="forecast-weather">
                  <span class="forecast-high">${Math.round(
                    eachDay.temp.max
                  )}°</span>
                  <span class="forecast-min"> ${Math.round(
                    eachDay.temp.min
                  )}°</span>
                </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Using API to retrieve future forecast data
function forecastSearch(coordinates) {
  let apiKey = "349877ccd91127561e383eeea754adcd";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let units = "metric";
  let url = `${apiEndpoint}lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=${units}`;
  console.log(url);
  axios.get(url).then(updateForecast);
}

//Changing HTML
function updateWeather(response) {
  document.querySelector(
    "#location"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
  console.log(response.data);
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "#forecast-description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    "#temperature-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png"/>`;
  document
    .querySelector("#temperature-icon")
    .setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#current-day-time").innerHTML = currentDate(
    response.data.dt * 1000
  );
  celsius = Math.round(response.data.main.temp);
  kmh = Math.round(response.data.wind.speed);
  forecastSearch(response.data.coord);
}

//updating HTML to reflect imperial units and switching back to metric
function switchToImperial(event) {
  event.preventDefault();
  let fahrenheit = (celsius * 9) / 5 + 32;
  let mph = kmh * 1.609344;
  metric.classList.remove("active-link");
  imperial.classList.add("active-link");
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheit);
  document.querySelector("#windspeed").innerHTML = Math.round(mph);
}

function switchtoMetric(event) {
  event.preventDefault();
  metric.classList.add("active-link");
  imperial.classList.remove("active-link");
  document.querySelector("#temperature").innerHTML = celsius;
  document.querySelector("#windspeed").innerHTML = kmh;
}

//Using API to find City
function citySearch(city) {
  let units = "metric";
  let apiKey = "349877ccd91127561e383eeea754adcd";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(updateWeather);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySearch(city);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", citySubmit);

//Current Weather Location by Geolocation API
function showLocation(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let units = "metric";
  let key = "c80976c573499e510bce2291a278b926";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;
  axios.get(url).then(updateWeather);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-location-weather");
currentButton.addEventListener("click", currentPosition);

let celsius = null;
let kmh = null;
let imperial = document.querySelector("#fahrenheit");
imperial.addEventListener("click", switchToImperial);
let metric = document.querySelector("#celsius");
metric.addEventListener("click", switchtoMetric);

//Runs on page loading
citySearch("Duarte");
