async function logWeather(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=4GGPTYXEW5G2EF9FQJUVV9KX3&contentType=json`;

  let response = await fetch(url, { mode: "cors" });
  response = await response.json();
  console.log(response);
  console.log("");
  console.log("");

  const temperature = ((response.temp - 32) * 5) / 9;

  const conditions = response.conditions;
  const humidity = response.humidity;
  const windspeed = response.windspeed;

  console.log("temp: " + temperature);
  console.log("conditions: " + conditions);
  console.log("humidity: " + humidity);
  console.log("windspeed: " + windspeed);
}
