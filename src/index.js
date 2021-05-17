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
