// Store original content to restore on larger screens
let originalContent = null;
let isMobileView = false;

// Mobile UI function
function handleMobileUI() {
  const isMobile = window.innerWidth < 700;

  if (isMobile && !isMobileView) {
    const body = document.querySelector("body");

    // Store original content before replacing it
    if (!originalContent) {
      originalContent = body.innerHTML;
    }

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

    const getStartedButton = document.querySelector(".anchor");
    getStartedButton.addEventListener("click", handleGetStartedClick);

    isMobileView = true;
  } else if (!isMobile && isMobileView) {
    const body = document.querySelector("body");

    if (originalContent) {
      body.innerHTML = originalContent;
      const originalButton = document.querySelector(".anchor");
      if (originalButton) {
        originalButton.addEventListener("click", handleGetStartedClick);
      }
    }

    isMobileView = false;
  }
}

function handleGetStartedClick() {
  hasClickedTheButton = true;
  if (!isfetchingDataComplete) {
    displayLoader();
  } else {
    window.location.href = "../html/home.html";
  }
}

// Initialize on page load
handleMobileUI();
window.addEventListener("resize", handleMobileUI);

// Initial event listener setup (in case page loads in desktop mode)
const initialButton = document.querySelector(".anchor");
if (initialButton) {
  initialButton.addEventListener("click", handleGetStartedClick);
}
