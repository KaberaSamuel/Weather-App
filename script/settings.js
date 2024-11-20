const toggleParents = Array.from(document.querySelectorAll(".toggle-parent"));
const measures = Array.from(document.querySelectorAll(".measure"));

// toggle on and off on notifications settings
toggleParents.forEach((parent) => {
  const child = parent.querySelector(".toggle");
  child.addEventListener("click", () => {
    parent.classList.toggle("on");
  });
});

// function ensuring that right border is set on right items measure container
function checkBorder(parent) {
  const children = Array.from(parent.children);
  children.forEach((child) => {
    child.style.border = "none";
    const currentId = parent.querySelector(".active").id.at(-1);
    const childId = child.id.at(-1);
    const diff = currentId - childId;

    if (diff > 1 || diff < 0) {
      child.style.borderRight = "var(--linecolor) 2px solid";
    }
  });
}

function setActive(element) {
  const parent = element.parentElement;
  Array.from(parent.children).forEach((child) =>
    child.classList.remove("active")
  );
  element.classList.add("active");
}

function customizeTemperatureUnits(e) {
  const element = e.target;
  setActive(element);
  const property = element.textContent.toLowerCase();
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));
  weatherData.conditions.temp = weatherData.units.temperature[property];
  weatherData.units.temperature.current = property;

  localStorage.setItem("weatherData", JSON.stringify(weatherData));
}

function customizeWindUnits(e) {
  const element = e.target;
  setActive(element);
  checkBorder(element.parentElement);

  let property = element.textContent.toLowerCase();
  property = property.replace("/", "");
  const weatherData = JSON.parse(localStorage.weatherData);
  weatherData.conditions.windspeed = weatherData.units.wind[property];
  weatherData.units.wind.current = property;

  localStorage.setItem("weatherData", JSON.stringify(weatherData));
}

function customizePressureUnits(e) {
  const element = e.target;
  setActive(element);
  checkBorder(element.parentElement);
  const property = element.textContent.toLowerCase();
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));
  weatherData.conditions.pressure = weatherData.units.pressure[property];
  weatherData.units.pressure.current = property;

  localStorage.setItem("weatherData", JSON.stringify(weatherData));
}

function customizeDistanceUnits(e) {
  const element = e.target;
  setActive(element);

  const property = element.textContent.toLowerCase();
  const weatherData = JSON.parse(localStorage.weatherData);
  weatherData.conditions.visibility = weatherData.units.distance[property];
  weatherData.units.distance.current = property;

  localStorage.setItem("weatherData", JSON.stringify(weatherData));
}

function customizeFeelslikeUnits(e) {
  const element = e.target;
  setActive(element);
  const property = element.textContent.toLowerCase();
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));
  weatherData.conditions.feelslike = weatherData.units.feelslike[property];
  weatherData.units.feelslike.current = property;
  localStorage.setItem("weatherData", JSON.stringify(weatherData));
}

function customizePrecipitationUnits(e) {
  const element = e.target;
  setActive(element);
  const property = element.textContent.toLowerCase();
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));
  weatherData.units.precipitation.current = property;
  localStorage.setItem("weatherData", JSON.stringify(weatherData));
}

(function customizingUnits() {
  const weatherData = JSON.parse(localStorage.getItem("weatherData"));
  const temperatureUnits = document.querySelector(".temperature");
  const windUnitsParent = document.querySelector(".wind");
  const pressureUnitsParent = document.querySelector(".pressure");
  const distanceUnitsParent = document.querySelector(".distance");
  const precipitationUnitsParent = document.querySelector(".precipitation");

  Array.from(temperatureUnits.children).forEach((element) => {
    if (
      element.textContent.toLowerCase() ===
      weatherData.units.temperature.current
    ) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }

    element.addEventListener("click", (e) => {
      customizeTemperatureUnits(e);
      customizeFeelslikeUnits(e);
    });
  });

  Array.from(windUnitsParent.children).forEach((element) => {
    if (
      element.textContent.toLowerCase().replace("/", "") ===
      weatherData.units.wind.current
    ) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }

    element.addEventListener("click", customizeWindUnits);
  });

  Array.from(pressureUnitsParent.children).forEach((element) => {
    if (
      element.textContent.toLowerCase() === weatherData.units.pressure.current
    ) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }

    element.addEventListener("click", customizePressureUnits);
  });

  Array.from(distanceUnitsParent.children).forEach((element) => {
    if (
      element.textContent.toLowerCase() === weatherData.units.distance.current
    ) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }

    element.addEventListener("click", customizeDistanceUnits);
  });

  Array.from(precipitationUnitsParent.children).forEach((element) => {
    if (
      element.textContent.toLowerCase() ===
      weatherData.units.precipitation.current
    ) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }

    element.addEventListener("click", customizePrecipitationUnits);
  });

  // checking border on every page load
  checkBorder(windUnitsParent);
  checkBorder(pressureUnitsParent);
})();
