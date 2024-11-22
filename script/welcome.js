// dealing small sreen of the welcome page
function mobileUI() {
  if (window.innerWidth < 500) {
    console.log("small screen");

    const body = document.querySelector("body");
    body.innerHTML = "";
    const main = document.createElement("main");
    main.innerHTML = `
      <img src="../images/umbrella.png" alt="umbrella" />

      <div>
        <p class="large">Breeze</p>
        <p>Weather App</p>
      </div>

      <a href="../html/home.html"><i class="fa-solid fa-arrow-right"></i></a>
    `;

    body.appendChild(main);
  }
}

mobileUI(6);
