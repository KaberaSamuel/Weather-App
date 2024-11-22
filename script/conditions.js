function updateConditionsUI() {
  const conditions = JSON.parse(localStorage.weatherData).conditions;

  document.querySelector(".grid .uv-index .measure span").textContent =
    conditions.uvindex;

  document.querySelector(".grid .wind .measure span").textContent =
    conditions.windspeed;

  document.querySelector(".grid .humidity .measure span").textContent =
    conditions.humidity;

  document.querySelector(".grid .visibility .measure span").textContent =
    conditions.visibility;

  document.querySelector(".grid .feels-like .measure span").textContent =
    conditions.feelslike;

  document.querySelector(".grid .rain-chance .measure span").textContent =
    conditions.rainchance;

  document.querySelector(".grid .pressure .measure span").textContent =
    conditions.pressure;

  document.querySelector(".grid .uv-index .measure span").textContent =
    conditions.uvindex;

  // dealing of changing of measurement units
  units.changeWindSpeed();
  units.changeDistance();
  units.changePressure();
  units.changeDistance();
}

function display() {
  updateCurrentCityUI();
  updateTimeSectionsUI(3);
  updateWeekForecastUI(7);
  updateConditionsUI();
}

// dealing with smaller screens
function conditionsMobileUI() {
  if (window.innerWidth < 500) {
    const forecastElement = document.querySelector(".forecast");
    const body = document.querySelector("body");

    body.removeChild(forecastElement);
  }
}

display();
conditionsMobileUI();
