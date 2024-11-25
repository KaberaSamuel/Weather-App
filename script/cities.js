function display() {
  updateCurrentCityUI();
  updateTimeSectionsUI(3);
  updateWeekForecastUI(3);
  displayCities();
}

function citiesMobileUI() {
  if (window.innerWidth < 500) {
    const forecastElement = document.querySelector(".forecast");
    const body = document.querySelector("body");

    body.removeChild(forecastElement);
  }
}

display();
citiesMobileUI();
