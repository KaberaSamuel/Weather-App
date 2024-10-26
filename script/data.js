let conditions = {
  icon: "",
  temp: "",
  pressure: "",
  windspeed: "",
  feelslike: "",
  uvindex: "",
  visibility: "",
  sunset: "",
  description: "",
  humidity: "",
  rainchance: "",
};

const daySections = {
  0: {
    temp: 0,
    icon: "",
  },

  1: {
    temp: 0,
    icon: "",
  },

  2: {
    temp: 0,
    icon: "",
  },

  3: {
    temp: 0,
    icon: "",
  },

  4: {
    temp: 0,
    icon: "",
  },

  5: {
    temp: 0,
    icon: "",
  },
};

const weekForecast = {
  0: {
    icon: "",
    dayName: "",
    date: "",
    description: "",
  },

  1: {
    icon: "",
    dayName: "",
    date: "",
    description: "",
  },

  2: {
    icon: "",
    dayName: "",
    date: "",
    description: "",
  },

  3: {
    icon: "",
    dayName: "",
    date: "",
    description: "",
  },

  4: {
    icon: "",
    dayName: "",
    date: "",
    description: "",
  },

  5: {
    icon: "",
    dayName: "",
    date: "",
    description: "",
  },

  6: {
    icon: "",
    dayName: "",
    date: "",
    description: "",
  },
};

const locations = {};

function updateConditions(weatherData) {
  const currentConditions = weatherData.currentConditions;
  conditions.temp = currentConditions.temp;
  conditions.pressure = currentConditions.pressure;
  conditions.windspeed = currentConditions.windspeed;
  conditions.feelslike = currentConditions.feelslike;
  conditions.uvindex = currentConditions.uvindex;
  conditions.visibility = currentConditions.visibility;
  conditions.sunset = currentConditions.sunset;
  conditions.humidity = currentConditions.humidity;
  conditions.icon = currentConditions.icon;
  conditions.rainchance = currentConditions.precipprob;
  conditions.description = currentConditions.conditions;
}

function updateDaySections(weatherData) {
  const hours = weatherData.days[0].hours;
  daySections[0].temp = hours[6].temp;
  daySections[0].icon = hours[6].icon;

  daySections[1].temp = hours[9].temp;
  daySections[1].icon = hours[9].icon;

  daySections[2].temp = hours[12].temp;
  daySections[2].icon = hours[12].icon;

  daySections[3].temp = hours[15].temp;
  daySections[3].icon = hours[15].icon;

  daySections[4].temp = hours[18].temp;
  daySections[4].icon = hours[18].icon;

  daySections[5].temp = hours[21].temp;
  daySections[5].icon = hours[21].icon;
}

function updateWeekForecast(weatherData) {
  const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const forecastDays = weatherData.days.slice(0, 7);

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

    // conditions = conditions.replaceAll("Partially ", "");

    // updating date to be an array of a day and a month
    date = [dateArray[2], dateArray[1]];

    if (index === 0) {
      dayName = "Today";
    }

    weekForecast[index].icon = icon;
    weekForecast[index].dayName = dayName;
    weekForecast[index].date = date;
    weekForecast[index].description = conditions;
  });
}

function updateLocations(locationName) {
  const length = Object.keys(locations).length + 1;
  locations[`location${length}`] = { name: locationName };
}

// function for updating weather trackers as a whole
function updateWeatherTrackers(weatherData, location) {
  updateConditions(weatherData);
  updateDaySections(weatherData);
  updateWeekForecast(weatherData);
  updateLocations(location);
}

async function getWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=4GGPTYXEW5G2EF9FQJUVV9KX3&contentType=json`;

  let response = await fetch(url, { mode: "cors" });
  response = await response.json();
  updateWeatherTrackers(response, location);

  console.log(" fetching data completed");
  return response;
}

// function for updating currect location on UI
function updateCurrentCityUI(location) {
  const cityName = document.querySelector(" .current-city .large");
  const rainChance = document.querySelector(".current-city .city span");
  const temperature = document.querySelector(".current-city .temp span");
  const img = document.querySelector(".current-city img");

  cityName.textContent = location;
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
  const weekdaysUIArray = Array.from(
    document.querySelectorAll(".week-forecast .day")
  );
  while (index < maxcount) {
    const dayUI = weekdaysUIArray[index];
    const dayData = weekForecast[index];

    dayUI.querySelector("img").src = getImage(dayData.icon);
    dayUI.querySelector(".weather p").textContent = dayData.description;
    dayUI.children[0].textContent = dayData.dayName;
    dayUI.children[2].innerHTML = `<span>${dayData.date[0]}</span>/${dayData.date[1]}`;

    index++;
  }
}

// function for getting image based on icon text
function getImage(icon) {
  return `../images/${icon}.png`;
}
