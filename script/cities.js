function display() {
  updateCurrentCityUI();
  updateTimeSectionsUI(3);
  updateWeekForecastUI(3);
  displayCities();
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
