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

  // dealing with matching wind speed unit
  units.changeWindSpeed();
}

// function of showing respective weather elements on the UI
function display() {
  updateCurrentCityUI();
  updateTimeSectionsUI(7);
  updateWeekForecastUI(7);
  handleResize();
  updateAirConditionsUI();
}

function handleResize() {
  const isMobileScreen = window.innerWidth < 768;
  if (isMobileScreen) {
    updateTimeSectionsUI(3);
    updateWeekForecastUI(7);
  } else {
    updateTimeSectionsUI(7);
    updateWeekForecastUI(7);
  }
}

window.addEventListener("resize", handleResize);

display();
