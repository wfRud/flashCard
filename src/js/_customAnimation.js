window.onload = (function () {
  const navigationBurger = document.querySelector(".navigation__burger");
  const navigationList = document.querySelector(".navigation__list");
  navigationBurger.addEventListener("click", () => {
    navigationBurger.classList.toggle("active");
    navigationList.classList.toggle("active");
  });
})();
