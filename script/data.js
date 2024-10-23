// object that will store data for current conditions of current day
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

// object that will store data for different sections in a day from 6am to 9pm
let daySections = {
  6: {
    temp: 0,
    icon: "",
  },

  9: {
    temp: 0,
    icon: "",
  },

  12: {
    temp: 0,
    icon: "",
  },

  15: {
    temp: 0,
    icon: "",
  },

  18: {
    temp: 0,
    icon: "",
  },

  21: {
    temp: 0,
    icon: "",
  },
};

// function for updating conditions and daysections objects everytime new weather data is called
function updateWeatherTrackers(response) {
  // updating conditions object
  const currentConditions = response.currentConditions;
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

  // updating day section object
  const hours = response.days[0].hours;
  daySections[6].temp = hours[6].temp;
  daySections[6].icon = hours[6].icon;

  daySections[9].temp = hours[9].temp;
  daySections[9].icon = hours[9].icon;

  daySections[12].temp = hours[12].temp;
  daySections[12].icon = hours[12].icon;

  daySections[15].temp = hours[15].temp;
  daySections[15].icon = hours[15].icon;

  daySections[18].temp = hours[18].temp;
  daySections[18].icon = hours[18].icon;

  daySections[21].temp = hours[21].temp;
  daySections[21].icon = hours[21].icon;
}

async function getData(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=4GGPTYXEW5G2EF9FQJUVV9KX3&contentType=json`;

  let response = await fetch(url, { mode: "cors" });
  response = await response.json();

  updateWeatherTrackers(response);
  return response;
}
