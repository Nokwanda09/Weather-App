let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[new Date().getDay()];
let date = new Date().getDate();
let month = months[new Date().getMonth()];
let hours = new Date().getHours();
let munites = new Date().getMinutes();

let dayOnScreen = document.querySelector("#day");
dayOnScreen.innerHTML = day;
let dateOnScreen = document.querySelector("#date");
dateOnScreen.innerHTML = `, ${date} ${month}`;

let timeOnScreen = document.querySelector("#time");

if (hours < 10) {
  timeOnScreen.innerHTML = `0${hours}:${munites}`;
}
if (munites < 10) {
  timeOnScreen.innerHTML = `${hours}:0${munites}`;
} else {
  timeOnScreen.innerHTML = `${hours}:${munites}`;
}
function displayDefaultCity() {
  let defaultCity = "Durban";
  let city = document.querySelector("#city");
  city.innerHTML = defaultCity;

  let apiKey = "8123783b747891cdafd883d799046f7c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let iconCode = response.data.weather[0].icon;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityInput = document.querySelector("#search-input");
  city.innerHTML = cityInput.value;
  let apiKey = "8123783b747891cdafd883d799046f7c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);

displayDefaultCity();
