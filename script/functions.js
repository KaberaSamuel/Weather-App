"use strict";

function updateConditions(weatherObject, fetchedData) {
  const currentConditions = fetchedData.currentConditions;
  weatherObject.conditions.temp = currentConditions.temp;
  weatherObject.conditions.pressure = currentConditions.pressure;
  weatherObject.conditions.windspeed = currentConditions.windspeed;
  weatherObject.conditions.feelslike = currentConditions.feelslike;
  weatherObject.conditions.uvindex = currentConditions.uvindex;
  weatherObject.conditions.visibility = currentConditions.visibility;
  weatherObject.conditions.sunset = currentConditions.sunset;
  weatherObject.conditions.humidity = currentConditions.humidity;
  weatherObject.conditions.icon = currentConditions.icon;
  weatherObject.conditions.rainchance = currentConditions.precipprob;
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

    // condition for catching days that start with zero e.g: 0.2,0.3
    let dayname = date[0].toString();
    if (dayname.charAt(0) === "0") {
      dayname = dayname.charAt(1);
    }

    date[0] = dayname;

    weatherObject.weekForecast[index].icon = icon;
    weatherObject.weekForecast[index].dayName = dayName;
    weatherObject.weekForecast[index].date = date;

    weatherObject.weekForecast[index].description = conditions;
  });
}

function updateLocations(weatherObject, locationName) {
  const locationObject = {
    name: locationName,
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

// function for updating weather tracker as a whole by returning an weather data object that will be stored on the local storage
function updateWeatherTracker(fetchedData, location) {
  const weatherData = JSON.parse(localStorage.weatherData);

  updateConditions(weatherData, fetchedData);
  updateDaySections(weatherData, fetchedData);
  updateWeekForecast(weatherData, fetchedData);
  updateLocations(weatherData, location);

  return weatherData;
}

// function receiving location name to fetch weather data using visual crossing weather api
async function getWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=4GGPTYXEW5G2EF9FQJUVV9KX3&contentType=json`;

  let result = await fetch(url, { mode: "cors" });
  result = await result.json();

  const updatedWeather = updateWeatherTracker(result, location);
  // console.log(updatedWeather);

  localStorage.setItem("weatherData", JSON.stringify(updatedWeather));

  console.log("done");
}

// function for updating currect location on UI
function updateCurrentCityUI() {
  const weather = JSON.parse(localStorage.weatherData);
  const conditions = weather.conditions;
  const currentLocation = weather.locations.toReversed()[0];

  const cityName = document.querySelector(" .current-city .large");
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
  let index = 0;
  const timeSectionsArray = Array.from(
    document.querySelectorAll(".time-sections .section")
  );
  // console.log(timeSectionsArray);
  const daySections = JSON.parse(localStorage.weatherData).daySections;

  while (index < maxcount) {
    let section = timeSectionsArray[index];
    section.querySelector("img").src = getImage(daySections[index].icon);
    section.querySelector(".degrees span").textContent =
      daySections[index].temp;
    index++;
  }
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

// function for getting image based on icon text
function getImage(icon) {
  return `../images/${icon}.png`;
}
