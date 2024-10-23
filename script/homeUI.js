// function for getting image based on icon text
function getImage(icon) {
  return `../images/${icon}.png`;
}

getData("kigali").then((value) => {
  // updating current city
  (function () {
    const cityName = document.querySelector(" .current-city .large");
    const rainChance = document.querySelector(".current-city .city span");
    const temperature = document.querySelector(".current-city .temp span");
    const img = document.querySelector(".current-city img");

    cityName.textContent = "kigali";
    rainChance.textContent = conditions.rainchance;
    temperature.textContent = conditions.temp;
    img.src = getImage(conditions.icon);
  })();

  // updating time sections throught the day
  (function () {
    const sixam = document.querySelector(".today-forecast .six-am");
    sixam.querySelector("img").src = getImage(daySections[6].icon);
    sixam.querySelector(".degrees span").textContent = daySections[6].temp;

    const nineam = document.querySelector(".today-forecast .nine-am");
    nineam.querySelector("img").src = getImage(daySections[9].icon);
    nineam.querySelector(".degrees span").textContent = daySections[9].temp;

    const twelvepm = document.querySelector(".today-forecast .twelve-pm");
    twelvepm.querySelector("img").src = getImage(daySections[12].icon);
    twelvepm.querySelector(".degrees span").textContent = daySections[12].temp;

    const threepm = document.querySelector(".today-forecast .three-pm");
    threepm.querySelector("img").src = getImage(daySections[15].icon);
    threepm.querySelector(".degrees span").textContent = daySections[15].temp;

    const sixpm = document.querySelector(".today-forecast .three-pm");
    sixpm.querySelector("img").src = getImage(daySections[18].icon);
    sixpm.querySelector(".degrees span").textContent = daySections[18].temp;

    const ninepm = document.querySelector(".today-forecast .nine-pm");
    ninepm.querySelector("img").src = getImage(daySections[21].icon);
    ninepm.querySelector(".degrees span").textContent = daySections[21].temp;
  })();

  // updating air conditions
  (function () {
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
  })();

  // updating week forecast
  (function () {
    // 1. array containing weeknames so that we can retreive them using js date object
    const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    const domDays = Array.from(
      document.querySelectorAll(".week-forecast .day")
    );
    const forecastDays = value.days;

    // 2. creating a loop that will update all 7 days forecast using just icon of the day
    domDays.forEach((day, index) => {
      const icon = forecastDays[index].icon;
      const date = new Date(forecastDays[index].datetime);
      let dayName = dayNames[date.getDay(date)];

      if (index === 0) {
        dayName = "Today";
      }

      day.querySelector("img").src = getImage(icon);
      day.querySelector(".weather p").textContent = icon;
      day.querySelector("p").textContent = dayName;
    });
  })();
});
