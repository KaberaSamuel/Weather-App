const isMobileScreen = window.innerWidth < 500;

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
  if (isMobileScreen) {
    // removing search input
    const main = document.querySelector(".main");
    main.removeChild(main.children[0]);
    updateTimeSectionsUI(3);
  } else {
    updateTimeSectionsUI(6);
  }
  updateWeekForecastUI(7);
  updateAirConditionsUI();
}

display();
smallScreenSidebar();
