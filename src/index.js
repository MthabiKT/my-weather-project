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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let forecastHTML = `<div class="row weather-temperature " >`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col">
             <div
            class="card-bottom  forcast-wrapper"
            id="forecast"
          >
               ${formatDay(forecastDay.dt)} 
                <span class="weather-forecast-temperature-max ">
                ${Math.round(
                  forecastDay.temp.max
                )}&deg;C </span>/  <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}&deg;C </span>
                   <img src="http://openweathermap.org/img/wn/${
                     forecastDay.weather[0].icon
                   }@2x.png" id="icon"  />
                  
                </span>
            </div>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  console.log(forecastHTML);
}
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

function citySearch(city) {
  let apiKey = "ae5e9256f0e601c5ba82629afefbe54e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
citySearch("mbabane");

function getForecast(coordinates) {
  console.log(coordinates);
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = "ae5e9256f0e601c5ba82629afefbe54e";
  let apiUrl = `https://api.openweathermap.org//data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(coordinates);
}

function displayWeather(response) {
  console.log(response);

  let displayCity = document.querySelector("#current-city");
  displayCity.innerHTML = response.data.name;
  let displayTemp = document.querySelector("#degree");
  let temp = Math.round(response.data.main.temp);
  displayTemp.innerHTML = `${temp}`;
  let displayIcon = document.querySelector("#icon");
  displayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
  displayForecast();
}
