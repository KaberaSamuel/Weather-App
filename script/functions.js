"use strict";
function updateConditions(weatherObject, fetchedData) {
  const currentConditions = fetchedData.currentConditions;

  const tempUnit = weatherObject.units.temperature.current;
  const windUnit = weatherObject.units.wind.current;
  const pressureUnit = weatherObject.units.pressure.current;
  const distanceUnit = weatherObject.units.distance.current;

  weatherObject.conditions.temp = weatherObject.units.temperature[tempUnit];
  weatherObject.conditions.pressure =
    weatherObject.units.pressure[pressureUnit];
  weatherObject.conditions.windspeed = weatherObject.units.wind[windUnit];
  weatherObject.conditions.visibility =
    weatherObject.units.distance[distanceUnit];

  weatherObject.conditions.rainchance = currentConditions.precipprob;
  weatherObject.conditions.feelslike = currentConditions.feelslike;
  weatherObject.conditions.uvindex = currentConditions.uvindex;
  weatherObject.conditions.sunset = currentConditions.sunset;
  weatherObject.conditions.humidity = currentConditions.humidity;
  weatherObject.conditions.icon = currentConditions.icon;

  weatherObject.conditions.description = currentConditions.conditions;
}

function updateDaySections(weatherObject, fetchedData) {
  const hours = fetchedData.days[0].hours;
  weatherObject.daySections[0].temp = hours[6].temp;
  weatherObject.daySections[0].icon = hours[6].icon;

  weatherObject.daySections[1].temp = hours[9].temp;
  weatherObject.daySections[1].icon = hours[9].icon;

  weatherObject.daySections[2].temp = hours[12].temp;
  weatherObject.daySections[2].icon = hours[12].icon;

  weatherObject.daySections[3].temp = hours[15].temp;
  weatherObject.daySections[3].icon = hours[15].icon;

  weatherObject.daySections[4].temp = hours[18].temp;
  weatherObject.daySections[4].icon = hours[18].icon;

  weatherObject.daySections[5].temp = hours[21].temp;
  weatherObject.daySections[5].icon = hours[21].icon;
}

function updateWeekForecast(weatherObject, fetchedData) {
  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const forecastDays = fetchedData.days.slice(0, 7);

  // a loop to update weekForecast object
  forecastDays.forEach((day, index) => {
    const icon = day.icon;
    let date = new Date(day.datetime);
    let dayName = dayNames[date.getDay()];
    const dateArray = date.toString().split(" ");
    let conditions = day.conditions;

    if (conditions.toString().includes(",")) {
      conditions = conditions.split(",")[0];
    }

    // updating date to be an array of a day and a month
    date = [dateArray[2], dateArray[1]];

    weatherObject.weekForecast[index].icon = icon;
    weatherObject.weekForecast[index].dayName = dayName;
    weatherObject.weekForecast[index].date = date;
    weatherObject.weekForecast[index].description = conditions;
  });
}

function updateLocations(weatherObject, fetchedData, locationName) {
  const now = new Date();
  let hours = now.getHours();
  hours = formatNumber(hours);
  let minutes = now.getMinutes();
  minutes = formatNumber(minutes);

  const locationObject = {
    name: locationName,
    icon: fetchedData.currentConditions.icon,
    time: `${hours}:${minutes}`,
    temperature: fetchedData.currentConditions.temp,
  };

  // catching situation where a location is used more than once
  if (weatherObject.locations.length > 0) {
    const numberOfLocations = weatherObject.locations.length - 1;

    weatherObject.locations.forEach((location, index) => {
      if (location.name === locationName) {
        weatherObject.locations.splice(index, 1);
      }
    });
  }

  weatherObject.locations.push(locationObject);
}

function updateUnits(weatherObject, fetchedData) {
  // temperature units
  const celsius = Math.round(fetchedData.currentConditions.temp * 100) / 100;
  const fahrenheit = Math.round(((celsius * 9) / 5 + 32) * 100) / 100;
  weatherObject.units.temperature.current = "celsius";
  weatherObject.units.temperature.celsius = celsius;
  weatherObject.units.temperature.fahrenheit = fahrenheit;

  // wind speed units
  const kmh = Math.round(fetchedData.currentConditions.windspeed * 100) / 100;
  const ms = Math.round((kmh / 3.6) * 100) / 100;
  const knots = Math.round((kmh / 1.852) * 100) / 100;
  weatherObject.units.wind.current = "kmh";
  weatherObject.units.wind.kmh = kmh;
  weatherObject.units.wind.ms = ms;
  weatherObject.units.wind.knots = knots;

  // pressure units
  const hpa = Math.round(fetchedData.currentConditions.pressure * 100) / 100;
  const inches = Math.round(hpa * 0.2953 * 100) / 100;
  const kpa = Math.round(hpa * 0.1 * 100) / 100;
  const mmhg = Math.round(hpa * 0.75006 * 100) / 100;
  weatherObject.units.pressure.current = "hpa";
  weatherObject.units.pressure.hpa = hpa;
  weatherObject.units.pressure.inches = inches;
  weatherObject.units.pressure.kpa = kpa;
  weatherObject.units.pressure.mm = mmhg;

  // distance units
  const kilometers = fetchedData.currentConditions.visibility;
  const meters = kilometers * 1000;
  weatherObject.units.distance.current = "kilometers";
  weatherObject.units.distance.kilometers = kilometers;
  weatherObject.units.distance.meters = meters;

  // feelslike units
  const celsiusFeelslike =
    Math.round(fetchedData.currentConditions.feelslike * 100) / 100;
  const fahrenheitFeelslike =
    Math.round(((celsiusFeelslike * 9) / 5 + 32) * 100) / 100;
  weatherObject.units.feelslike.current = "celsius";
  weatherObject.units.feelslike.celsius = celsiusFeelslike;
  weatherObject.units.feelslike.fahrenheit = fahrenheitFeelslike;

  // precipitation units
  weatherObject.units.precipitation.current = "millimeters";
}

// function for updating weather tracker as a whole by returning an weather data object that will be stored on the local storage
function getUpdatedData(fetchedData, location) {
  const weatherData = JSON.parse(localStorage.weatherData);
  updateUnits(weatherData, fetchedData);
  updateConditions(weatherData, fetchedData);
  updateDaySections(weatherData, fetchedData);
  updateWeekForecast(weatherData, fetchedData);
  updateLocations(weatherData, fetchedData, location);

  return weatherData;
}

// function receiving location name to fetch weather data using visual crossing weather api
async function getWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=4GGPTYXEW5G2EF9FQJUVV9KX3&contentType=json`;

  const response = await fetch(url, { mode: "cors" });
  if (response.status >= 200 && response.status < 300) {
    const result = await response.json();
    const updatedWeather = getUpdatedData(result, location);
    localStorage.setItem("weatherData", JSON.stringify(updatedWeather));
  } else {
    alert("Wrong location, try again");
  }
}

// function for updating currect location on UI
function updateCurrentCityUI() {
  const weather = JSON.parse(localStorage.weatherData);
  const conditions = weather.conditions;
  const currentLocation = weather.locations.toReversed()[0];

  const cityName = document.querySelector(" .current-city .cityname");
  const rainChance = document.querySelector(".current-city .city span");
  const temperature = document.querySelector(".current-city .temp span");
  const img = document.querySelector(".current-city img");

  cityName.textContent = currentLocation.name;
  rainChance.textContent = conditions.rainchance;
  temperature.textContent = conditions.temp;
  img.src = getImage(conditions.icon);
}

// updating time sections throught the day on UI
function updateTimeSectionsUI(maxcount) {
  const timeSectionsElement = document.querySelector(".time-sections");
  const timeSectionsArray = Array.from(
    document.querySelectorAll(".time-sections .section")
  );
  const daySections = JSON.parse(localStorage.weatherData).daySections;

  timeSectionsArray.forEach((element, index) => {
    if (index < maxcount) {
      element.querySelector("img").src = getImage(daySections[index].icon);
      element.querySelector(".degrees span").textContent =
        daySections[index].temp;
    } else {
      timeSectionsElement.removeChild(element);
    }
  });
}

// updating week forecast on UI
function updateWeekForecastUI(maxcount) {
  let index = 0;
  const weekForecast = JSON.parse(localStorage.weatherData).weekForecast;
  const weekdaysUIArray = Array.from(
    document.querySelectorAll(".week-forecast .day")
  );
  while (index < maxcount) {
    const dayUI = weekdaysUIArray[index];
    const dayData = weekForecast[index];
    dayUI.querySelector("img").src = getImage(dayData.icon);
    dayUI.querySelector(".weather p").textContent = dayData.description;
    dayUI.children[0].textContent = dayData.dayName;
    dayUI.children[2].innerHTML = `<span>${dayData.date[0].toString()}</span>/${
      dayData.date[1]
    }`;

    index++;
  }
}

// function for display cities in order they were searched it will be called  in pages where it is needed
function displayCities(page) {
  const locations = JSON.parse(localStorage.weatherData).locations.toReversed();
  const citiesUI = document.querySelector(".cities");
  citiesUI.innerHTML = "";

  locations.forEach((city) => {
    const htmlString = `
      <div class="city">
        <img src="../images/${city.icon}.png" alt="weather" />

        <div class="description">
          <div class="city-name">
            <p>${city.name}</p>
            <i class="fa-solid fa-location-arrow"></i>
          </div>
          <p>${city.time}</p>
        </div>

        <p class="degrees">${city.temperature}&deg;</p>
      </div>

      ${
        page === "cities"
          ? `<div class="delete">
   <i class="fa-solid fa-xmark"></i>
      </div>`
          : ""
      }

    `;

    const div = document.createElement("div");
    div.setAttribute("class", "city-container");
    div.innerHTML = htmlString;
    citiesUI.appendChild(div);

    // using icon to search for cities
    const searchIcon = div.querySelector("i");
    searchIcon.addEventListener("click", (e) => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(
        city.name
      )}`;
      window.open(url, "_blank");
    });
  });
}

// function for getting image based on icon text
function getImage(icon) {
  return `../images/${icon}.png`;
}

// funtion for formatting numbers to always start with zeros
function formatNumber(number) {
  return number < 10 ? "0" + number : number;
}

// function for customizing sidebar for smaller screen devices
function smallScreenSidebar() {
  if (window.innerWidth < 500) {
    const sidebar = document.querySelector(".side-nav");
    sidebar.removeChild(sidebar.children[0]);
    const paraElements = Array.from(document.querySelectorAll(".side-nav p"));
    paraElements.forEach((element) => {
      element.parentElement.removeChild(element);
      console.log(element);
    });
  }
}

// updating on location search by firstly checking input field is available
const input = document.querySelector("input");
if (input) {
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      let location = input.value;
      input.value = "";
      location = location.replaceAll(" ", "");
      location = location.toLowerCase();
      getWeatherData(location).then(() => {
        display();
      });
    }
  });
}

// object for changing measurements units on the UI eg: from m/s to km/h
const units = {
  weather: JSON.parse(localStorage.weatherData),
  changeWindSpeed: function () {
    const windspeedUnit = this.weather.units.wind.current;
    document.querySelector(".measure .windUnit").textContent =
      windspeedUnit === "ms"
        ? "m/s"
        : windspeedUnit === "knots"
        ? "knots"
        : "km/h";
  },
  changeDistance: function () {
    const distanceUnit = this.weather.units.distance.current;
    document.querySelector(".measure .distanceUnit").textContent =
      distanceUnit === "meters" ? "m" : "km";
  },
  changePressure: function () {
    const pressureUnit = this.weather.units.pressure.current;
    document.querySelector(".measure .pressureUnit").textContent = pressureUnit;
  },
  changeDistance: function () {
    const distanceUnit = this.weather.units.distance.current;
    document.querySelector(".measure .distanceUnit").textContent =
      distanceUnit === "meters" ? "m" : "km";
  },
};
