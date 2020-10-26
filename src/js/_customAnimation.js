window.onload = (function () {
  const navigationBurger = document.querySelector(".navigation__burger");
  const navigationList = document.querySelector(".navigation__list");
  const cardPanelAddBtn = document.querySelector(".card_panel__add__icon");
  const cardPanelForm = document.querySelector(".card_panel__form");

  cardPanelAddBtn.addEventListener("click", (e) => {
    cardPanelForm.classList.toggle("expanded");
  });

  navigationBurger.addEventListener("click", () => {
    navigationBurger.classList.toggle("active");
    navigationList.classList.toggle("active");
  });
})();
