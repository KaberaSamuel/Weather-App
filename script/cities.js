const isSmallScreen = window.innerWidth < 500;

function display() {
  displayCities("cities");

  const deleteIcons = document.querySelectorAll(".city-container .delete i");
  deleteIcons.forEach((element) => {
    element.addEventListener("click", () => {
      const cityName = element.parentElement.parentElement
        .querySelector(".city-name")
        .textContent.toLowerCase()
        .replaceAll(" ", "")
        .replaceAll("\n", "");

      removeCity(cityName);
    });
  });

  if (!isSmallScreen) {
    updateCurrentCityUI();
    updateTimeSectionsUI(3);
    updateWeekForecastUI(3);
  }
}

function removeCity(cityName) {
  const weatherData = JSON.parse(localStorage.weatherData);
  const cities = weatherData.locations;

  cities.forEach((city, index) => {
    if (city.name === cityName) {
      cities.splice(index, 1);
    }
  });

  if (cities.length === 0) {
    alert(
      "You can't delete a city if it is the only one remaining on your list"
    );
  } else {
    weatherData.locations = cities;
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
    display();
  }
}

// removing forecast elements on small screens
if (isSmallScreen) {
  const forecastElement = document.querySelector(".forecast");
  const body = document.querySelector("body");
  body.removeChild(forecastElement);
}

display();
smallScreenSidebar();
