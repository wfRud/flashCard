window.onload = (function () {
  const navigationBurger = document.querySelector(".navigation__burger");
  const navigationList = document.querySelector(".navigation__list");
  const cardPanelAddBtn = document.querySelector(".card_panel__add__icon");
  const cardPanelForm = document.querySelector(".card_panel__form");
  //   const singleCard = document.querySelector(".cards_cnt__card");
  const cards = document.querySelectorAll(".cards_cnt__card");
  //   const singleCardEditPanel = document.querySelector(
  //     ".cards_cnt__card__edit-panel"
  //   );

  cardPanelAddBtn.addEventListener("click", (e) => {
    cardPanelForm.classList.toggle("expanded");
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const editPanel = card.querySelector(".cards_cnt__card__edit-panel");
      editPanel.classList.toggle("expanded");
    });
  });

  navigationBurger.addEventListener("click", () => {
    navigationBurger.classList.toggle("active");
    navigationList.classList.toggle("active");
  });
})();
