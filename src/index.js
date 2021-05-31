function currentDate(timestamp) {
  let now = new Date(timestamp);

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (hours > 18) {
    document.getElementsByTagName("body")[0].style.background =
      "linear-gradient(#0a1931, #150e56, #325288)";
    document.getElementsByTagName("h1")[0].style.color = "white";
    document.getElementsByTagName("h2")[0].style.color = "white";
    document.getElementsByTagName("h5")[0].style.color = "white";
    document.getElementsByTagName("a")[0].style.color = "white";
    document.getElementsByTagName("a")[1].style.color = "#f7ea00";
    document.getElementsByTagName("a")[2].style.color = "#f7ea00";
    document.getElementsByTagName("a")[3].style.color = "#f7ea00";
    document.getElementsByTagName("p")[0].style.color = "white";
    document.getElementsByTagName("p")[1].style.color = "white";
    document.querySelector("#current-location-weather").className =
      "btn btn-outline-light";
    document.querySelector("#button-addon1").className =
      "btn btn-outline-light";
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
                <img src="${updateIcon(eachDay.weather[0].icon)}" alt="${
          eachDay.weather[0].description
        }" width=75 class="forecast-icon"/>
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
  let units = "imperial";
  let url = `${apiEndpoint}lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=${units}`;
  console.log(url);
  axios.get(url).then(updateForecast);
}

//Changing HTML
function updateIcon(currentIcon) {
  if (currentIcon === "01d") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/601/original/01d.png?1621999754";
  }
  if (currentIcon === "01n") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/920/original/01n.png?1622431885";
  }
  if (currentIcon === "02d") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/603/original/02d.png?1621999770";
  }
  if (currentIcon === "02n") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/604/original/02n.png?1621999779";
  }
  if (currentIcon === "03d") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/605/original/03d.png?1621999786";
  }
  if (currentIcon === "03n") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/606/original/03n.png?1621999793";
  }
  if (currentIcon === "04d") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/607/original/04d.png?1621999803";
  }
  if (currentIcon === "04n") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/608/original/04n.png?1621999811";
  }
  if (currentIcon === "09d") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/609/original/09d.png?1621999824";
  }
  if (currentIcon === "09n") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/610/original/09n.png?1621999831";
  }
  if (currentIcon === "10d") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/611/original/10d.png?1621999840";
  }
  if (currentIcon === "10n") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/612/original/10n.png?1621999850";
  }
  if (currentIcon === "11d") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/613/original/11d.png?1621999861";
  }
  if (currentIcon === "11n") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/614/original/11n.png?1621999870";
  }
  if (currentIcon === "13d") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/615/original/13d.png?1621999879";
  }
  if (currentIcon === "13n") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/616/original/13n.png?1621999890";
  }
  if (currentIcon === "50d") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/617/original/50d.png?1621999898";
  }
  if (currentIcon === "50n") {
    return "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/009/618/original/50n.png?1621999907";
  }
}

function updateWeather(response) {
  document.querySelector(
    "#location"
  ).innerHTML = `${response.data.name} <span class="country">${response.data.sys.country}</span>`;
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
  ).innerHTML = `<img src="${updateIcon(
    response.data.weather[0].icon
  )}" width=200/>`;
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
/*function switchToImperial(event) {
  event.preventDefault();
  let fahrenheit = (celsius * 9) / 5 + 32;
  let mph = kmh * 1.609344;
  metric.classList.remove("active-link");
  imperial.classList.add("active-link");
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheit);
  document.querySelector("#windspeed").innerHTML = Math.round(mph);
  document.querySelector("#wind-units").innerHTML = " mph";
}

function switchtoMetric(event) {
  event.preventDefault();
  metric.classList.add("active-link");
  imperial.classList.remove("active-link");
  document.querySelector("#temperature").innerHTML = celsius;
  document.querySelector("#windspeed").innerHTML = kmh;
  document.querySelector("#wind-units").innerHTML = " km/h";
}
*/

//Using API to find City
function citySearch(city) {
  let units = "imperial";
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
  let units = "imperial";
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

//let celsius = null;
//let kmh = null;
//let imperial = document.querySelector("#fahrenheit");
//imperial.addEventListener("click", switchToImperial);
//let metric = document.querySelector("#celsius");
//metric.addEventListener("click", switchtoMetric);

//Runs on page loading
citySearch("Duarte");
