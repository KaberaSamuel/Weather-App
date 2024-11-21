function mobileUI() {
  if (window.innerWidth < 500) {
    const sidebar = document.querySelector(".side-nav");
    sidebar.removeChild(sidebar.children[0]);
    const paraElements = Array.from(document.querySelectorAll(".side-nav p"));
    paraElements.forEach((element) => {
      element.parentElement.removeChild(element);
    });
  }
}

mobileUI();
