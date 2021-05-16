function currentDate() {
  let now = new Date();

  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = now.getSeconds();
  let year = now.getFullYear();
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
  let time = `${hours}:${minutes}:${seconds}`;
  let dayDisplay = document.querySelector("#current-day-time");
  dayDisplay.innerHTML = `${today} at ${time}`;
}

currentDate();

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 81;
  let todayHigh = document.querySelector("#today-high");
  todayHigh.innerHTML = "82°F";
  let todayLow = document.querySelector("#today-low");
  todayLow.innerHTML = "65°F";
  let futureTemp1 = document.querySelector("#future-temp1-high");
  futureTemp1.innerHTML = "68°F";
  let futureTemp2 = document.querySelector("#future-temp2-high");
  futureTemp2.innerHTML = "73°F";
  let futureTemp3 = document.querySelector("#future-temp3-high");
  futureTemp3.innerHTML = "67°F";
  let futureTemp4 = document.querySelector("#future-temp4-high");
  futureTemp4.innerHTML = "87°F";
  let futureTemp5 = document.querySelector("#future-temp5-high");
  futureTemp5.innerHTML = "91°F";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 27;
  let todayHigh = document.querySelector("#today-high");
  todayHigh.innerHTML = "28°C";
  let todayLow = document.querySelector("#today-low");
  todayLow.innerHTML = "18°C";
  let futureTemp1 = document.querySelector("#future-temp1-high");
  futureTemp1.innerHTML = "20°C";
  let futureTemp2 = document.querySelector("#future-temp2-high");
  futureTemp2.innerHTML = "23°C";
  let futureTemp3 = document.querySelector("#future-temp3-high");
  futureTemp3.innerHTML = "19°C";
  let futureTemp4 = document.querySelector("#future-temp4-high");
  futureTemp4.innerHTML = "30°C";
  let futureTemp5 = document.querySelector("#future-temp5-high");
  futureTemp5.innerHTML = "32°C";
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

//Changing HTML
function updateWeather(response) {
  document.querySelector(
    "#location"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);
}

function citySearch(event) {
  event.preventDefault();
  debugger;
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiKey = "c80976c573499e510bce2291a278b926";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;
  console.log(url);

  axios.get(url).then(updateWeather);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", citySearch);

//Current Weather by Geolocation
function myWeather(response) {
  let h2 = document.querySelector("h2");
  let city = response.data.name;
  let country = response.data.sys.country;
  h2.innerHTML = `${city}, ${country}`;
  let temperature = document.querySelector("#temperature");
  let currentLocationTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = currentLocationTemp;
}

function showLocation(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let units = "metric";
  let key = "c80976c573499e510bce2291a278b926";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;
  axios.get(url).then(myWeather);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-location-weather");
currentButton.addEventListener("click", currentPosition);
