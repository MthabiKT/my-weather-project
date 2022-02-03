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
displayForecast();

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = "forcast";
  let days = ["Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  
            <div class="row.box-a text-left" style="padding: 10px">
              
               ${day}
                <span class="min-icons col-sm-4.box-a ">
                 20&deg;C / 18&deg;C
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-clouds"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.513 3.513 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.587 5.587 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5z"
                    />
                    <path
                      d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.502 4.502 0 0 1 7 5zm3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492V9.5z"
                    />
                  </svg>
                </span>
            </div>
          </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;

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
