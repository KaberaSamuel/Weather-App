displayCities();

function showMap() {
  const map = L.map("map").setView([0, 0], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

showMap();

let map = L.map("map");

// function that will return an array of coordinates of a given city name inorder to mark it on the map
async function getCoordinates(cityName) {
  const url = `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { lat, lon } = data[0];
    return [lat, lon];
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [40.712, 74.006];
  }
}

function showMap() {
  const locationsArray = JSON.parse(localStorage.weatherData).locations;

  // getting current city name to use it as starting zoom and pan center
  const currentCityName = locationsArray.toReversed()[0].name;

  let [lat, long] = [0, 0];
  getCoordinates(currentCityName).then((result) => {
    map.setView(result, 12);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // showing markers and popups of searched locations
    (function showingMark6ers() {
      locationsArray.forEach((location) => {
        getCoordinates(location.name).then((coordinates) => {
          let marker = L.marker(coordinates).addTo(map);
          let popupDiv = document.createElement("div");
          popupDiv.setAttribute("class", "popup");
          popupDiv.innerHTML = `
          <p>${location.name}</p>
          <img src="../images/${location.icon}.png" >
          <p>${location.temperature}&deg
        `;
          marker.bindPopup(popupDiv, {
            className: "custom",
          });

          // opening a popup on the current location
          if (currentCityName === location.name) {
            marker.openPopup();
          }
        });
      });
    })();
  });
}

function display() {
  displayCities();
  showMap();
}

display();
