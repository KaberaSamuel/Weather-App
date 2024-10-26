// updating air conditions
function updateAirConditionsUI() {
  document.querySelector(
    ".air-conditions .grid .condition:first-child .measure span"
  ).textContent = conditions.feelslike;

  document.querySelector(
    ".air-conditions .grid .condition:nth-child(2) .measure span"
  ).textContent = conditions.windspeed;

  document.querySelector(
    ".air-conditions .grid .condition:nth-child(3) .measure span"
  ).textContent = conditions.rainchance;

  document.querySelector(
    ".air-conditions .grid .condition:nth-child(4) .measure span"
  ).textContent = conditions.uvindex;
}

function showWeather(location) {
  getWeatherData(location).then((response) => {
    updateCurrentCityUI(location);
    updateTimeSectionsUI(6);
    updateWeekForecastUI(7);
    updateAirConditionsUI();
  });
}

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
          .catch(() => resolve("newyork"));
      },
      () => {
        // when user refuses to track his/her location
        resolve("newyork");
      }
    );
  });
}

getCity().then((city) => showWeather(city));

// adding event listener on input field
const input = document.querySelector("input");
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const location = input.value;
    input.value = "";
    showWeather(location);
  }
});
