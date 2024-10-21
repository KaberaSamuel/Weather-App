const settings = (function () {
  const toggleParents = Array.from(document.querySelectorAll(".toggle-parent"));
  const measures = Array.from(document.querySelectorAll(".measure"));

  toggleParents.forEach((parent) => {
    const child = parent.querySelector(".toggle");
    child.addEventListener("click", () => {
      parent.classList.toggle("on");
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
        // child.style.border = "red 2px solid";
      }
    });
  }

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

  return { checkMeasureBorder };
})();

// starting values
document.addEventListener("load", () => {
  settings.checkMeasureBorder();
});
