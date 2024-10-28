// updating air conditions
function updateAirConditionsUI() {
  const conditions = JSON.parse(localStorage.weatherData).conditions;
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

// function of showing respective weather elements on the UI and update data on the backend as well
function display() {
  updateCurrentCityUI();
  updateTimeSectionsUI(6);
  updateWeekForecastUI(7);
  updateAirConditionsUI();
}

display();

// adding event listener on input field
const input = document.querySelector("input");
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
