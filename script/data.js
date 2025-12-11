"use strict";

let isfetchingDataComplete = false;
let hasClickedTheButton = false;

localStorage.clear();

const weatherData = {
  conditions: {
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
  },

  daySections: {
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
  },

  weekForecast: {
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
  },

  locations: [],

  units: {
    temperature: {
      current: "",
      celsius: "",
      fahrenheit: "",
    },
    wind: {
      current: "",
      kmh: "",
      ms: "",
      knots: "",
    },
    pressure: {
      current: "",
      hpa: "",
      inches: "",
      kpa: "",
      mm: "",
    },
    distance: {
      current: "",
      kilometers: "",
      meters: "",
    },
    feelslike: {
      current: "",
      celsius: "",
      fahrenheit: "",
    },
    precipitation: {
      current: "",
      millimeters: "",
      inches: "",
    },
  },
};

localStorage.setItem("weatherData", JSON.stringify(weatherData));

//function to get city based on location of the user
function getCity() {
  return new Promise(function (resolve) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // when user allows to track his/her location
        const [lat, long] = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=a7ac46ddef7241df9be80c31e44089e5`;

        fetch(url)
          .then((response) => response.json())
          .then((result) => {
            const city = result.features[0].properties.city;
            resolve(city);
          })
          .catch(() => resolve("madrid"));
      },
      () => {
        // when user refuses to track his/her location
        resolve("madrid");
      }
    );
  });
}

getCity().then((city) => {
  city = city.toLowerCase();
  getWeatherData(city).then(() => {
    isfetchingDataComplete = true;
    if (hasClickedTheButton) {
      window.location.href = "../html/home.html";
    }

    // redirect to homepage after 15s regardless of status
    setTimeout(() => {
      window.location.href = "../html/home.html";
    }, 15000);
  });
});
