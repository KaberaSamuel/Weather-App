const toggleParents = Array.from(document.querySelectorAll(".toggle-parent"));
const measures = Array.from(document.querySelectorAll(".measure"));

toggleParents.forEach((parent) => {
  const child = parent.querySelector(".toggle");
  child.addEventListener("click", () => {
    parent.classList.toggle("on");
  });
});

measures.forEach((parent) => {
  Array.from(parent.children).forEach((child) => {
    child.addEventListener("click", function (event) {
      parent.querySelector(".active").classList.remove("active");
      event.currentTarget.classList.add("active");

      if (parent.classList.contains("border")) {
        checkMeasureBorder(parent);
      }
    });
  });
});

// function ensuring that right border is set on right items measure container
function checkMeasureBorder(parent) {
  const childrens = Array.from(parent.children);
  childrens.forEach((child) => {
    child.style.border = "none";
    const currentId = parent.querySelector(".active").id.at(-1);
    const childId = child.id.at(-1);
    const diff = currentId - childId;

    if (diff > 1 || diff < 0) {
      child.style.borderRight = "var(--linecolor) 2px solid";
    }
  });
}

function customizeTemperatureUnits(e) {
  const property = e.target.textContent.toLowerCase();
  const weatherData = JSON.parse(localStorage.weatherData);
  const temperature = weatherData.conditions.temp;
  const measure = weatherData.units.temperature;
  let newTemperature;
  let newMeasure;

  // checking if there is no repeating of the same measure
  if (
    (property === "celsius" && measure === "f") ||
    (property === "fahrenheit" && measure === "c")
  ) {
    if (property === "celsius") {
      newTemperature = ((temperature - 32) * 5) / 9;
      newMeasure = "c";
    } else if ("fahrenheit") {
      newTemperature = (temperature * 9) / 5 + 32;
      newMeasure = "f";
    }

    weatherData.conditions.temp = newTemperature;
    weatherData.units.temperature = newMeasure;
    localStorage.setItem("weatherData", JSON.stringify(weatherData));
  }
}

function customizeWindUnits(e) {
  const weatherData = JSON.parse(localStorage.weatherData);
}

(function customizingUnits() {
  const temperatureUnits = Array.from(
    document.querySelectorAll(".temperature p")
  );
  const windUnits = Array.from(document.querySelectorAll(".wind p"));

  temperatureUnits.forEach((element) => {
    element.addEventListener("click", customizeTemperatureUnits);
  });

  windUnits.forEach((element) => {
    element.addEventListener("click", customizeWindUnits);
  });
})();
