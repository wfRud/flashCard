window.onload = (function () {
  const navigationBurger = document.querySelector(".navigation__burger");
  const navigationList = document.querySelector(".navigation__list");
  const cardPanelAddBtn = document.querySelector(".main_panel__add__icon");
  const cardPanelForm = document.querySelector(".main_panel__form");

  const cards = document.querySelectorAll(".cards_cnt__card");

  if (cardPanelAddBtn) {
    cardPanelAddBtn.addEventListener("click", (e) => {
      cardPanelForm.classList.toggle("expanded");
    });
  }

  if (cards) {
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const editPanel = card.querySelector(
          ".cards_cnt__card__inner__side__edit-panel"
        );
        editPanel.classList.toggle("expanded");
      });
    });
  }

  navigationBurger.addEventListener("click", () => {
    navigationBurger.classList.toggle("active");
    navigationList.classList.toggle("active");
  });
})();
