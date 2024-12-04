// dealing small sreen of the welcome page
(function mobileUI() {
  if (window.innerWidth < 500) {
    const body = document.querySelector("body");
    body.innerHTML = "";
    const main = document.createElement("main");
    main.innerHTML = `
      <img src="../images/umbrella.png" alt="umbrella" />

      <div>
        <p class="large">Breeze</p>
        <p>Weather App</p>
      </div>

      <div class="anchor"><i class="fa-solid fa-arrow-right"></i></div>
    `;

    body.appendChild(main);
  }
})();

const getStartedButton = document.querySelector(".anchor");

getStartedButton.addEventListener("click", () => {
  hasClickedTheButton = true;
  if (!isfetchingDataComplete) {
    displayLoader();
  } else {
    window.location.href = "../html/home.html";
  }
});
