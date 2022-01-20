function formatDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  console.log(day);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  console.log(hours);
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  console.log(minutes);

  let currentDate = `${day}, ${hours}:${minutes}`;
  let currentDateTime = document.querySelector(".date");
  currentDateTime.innerHTML = `${currentDate}`;
}

formatDate();

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-city");
  console.log(searchInput);
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = `${searchInput.value}`;

  let apiKey = "ae5e9256f0e601c5ba82629afefbe54e";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let searchedCity = document.querySelector("#search-form");
searchedCity.addEventListener("submit", searchCity);

//search-engine
function displayWeather(response) {
  console.log(response);

  let displayCity = document.querySelector("#current-city");
  displayCity.innerHTML = response.data.name;
  let displayTemp = document.querySelector("#degree");
  let temp = Math.round(response.data.main.temp);
  displayTemp.innerHTML = `${temp}`;
  let displayIcon = (document.querySelector("#icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png");
  displayIcon.innerHTML = response.data.weather[0].icon;
  let displaySummary = document.querySelector(".summary");
  displaySummary.innerHTML = response.data.weather[0].description;
  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = response.data.weather[0].main;
  let displayFeelsLike = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.main.feels_like);
  displayFeelsLike.innerHTML = `${feelsLike}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let minTemp = document.querySelector("#low-temp");
  minTemp, (innerHTML = response.data.main.temp_min);
}

//Bonus Feature
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ae5e9256f0e601c5ba82629afefbe54e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}

function currentWeather(response) {
  let displayCity = document.querySelector("#current-city");
  displayCity.innerHTML = response.data.name;
  let displayTemp = document.querySelector("#degree");
  let temp = Math.round(response.data.main.temp);
  displayTemp.innerHTML = `${temp}`;
  let displayIcon = (document.querySelector("#icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png");
  displayIcon.innerHTML = response.data.weather[0].icon;
  displayIcon.innerHTML = response.data.weather[0].icon;
  let displaySummary = document.querySelector(".summary");
  displaySummary.innerHTML = response.data.weather[0].description;
  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = response.data.weather[0].main;
  let displayFeelsLike = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.main.feels_like);
  displayFeelsLike.innerHTML = `${feelsLike}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let minTemp = document.querySelector("#low-temp");
  minTemp, (innerHTML = response.data.main.temp_min);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);
