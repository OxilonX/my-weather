const input = document.querySelector(".temperature");
const temperature = document.querySelector(".display");
const submit = document.querySelector(".submit");
const weatherIcon = document.querySelector(".weather-icon");
const city = document.querySelector(".city");
const countryDiv = document.querySelector(".country");
const weatherDescription = document.querySelector(".weather-description");
const windDiv = document.querySelector(".wind");
const humidityDiv = document.querySelector(".humidity");
const pressureDiv = document.querySelector(".pressure");
let dataObj = {};
window.onload = () => {
  input.focus();
  const storedWeatherData = JSON.parse(localStorage.getItem("data"));
  if (storedWeatherData) {
    displayWeatherData(storedWeatherData);
  }
};
function displayWeatherData(data) {
  city.innerText = `${data.city},`;
  countryDiv.innerText = `${data.country}`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.src}.png`;
  weatherDescription.innerText = `Expect ${data.weatherdescription} today.`;
  temperature.innerHTML = `${data.temperature}&#x2103;`;
  windDiv.innerText = `${data.windSpeed} km/hr`;
  humidityDiv.innerText = `${data.humidity} %`;
  pressureDiv.innerText = `${data.pressure} hPa`;
}

async function getWeatherData(e) {
  e.preventDefault();
  country = input.value.toString();
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=0d079cca0483cab722af0cf500758aab`
    );
    if (!response.ok) {
      input.placeholder = "Enter a country/city name...";
      input.value = "";
      return;
    } else {
      const data = await response.json();
      dataObj = {
        city: data.name,
        country: data.sys.country || "Unknown",
        src: data.weather[0].icon,
        weatherdescription: data.weather[0].description,
        temperature: Math.trunc(data.main.temp - 271),
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
      };
      localStorage.setItem("data", JSON.stringify(dataObj));
      displayWeatherData(dataObj);
    }
  } catch (err) {
    console.error(err);
  }
}

submit.addEventListener("click", getWeatherData);
