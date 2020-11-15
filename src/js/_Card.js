import Storage from "./_Storage";

export default class Card {
  constructor(id, questionContent, answerContent, category) {
    this.id = id;
    this.questionContent = questionContent;
    this.answerContent = answerContent;
    this.category = category;

    const _card = document.createElement("div"),
      _deleteIcon = document.createElement("img");

    this.getCardElement = () => _card;
    this.getDeleteIcon = () => _deleteIcon;
  }

  createCard() {
    const cardCnt = document.querySelector(".cards_cnt"),
      cardInner = document.createElement("div"),
      cardInnerFront = document.createElement("div"),
      cardInnerBack = document.createElement("div"),
      cardTextFront = document.createElement("p"),
      cardTextBack = document.createElement("p"),
      cardEditPanel = document.createElement("div"),
      editIconCnt = document.createElement("span"),
      deleteIconCnt = document.createElement("span"),
      editIcon = document.createElement("img");

    this.getCardElement().className = "cards_cnt__card";
    cardInner.className = "cards_cnt__card__inner";
    cardInnerFront.className = "cards_cnt__card__inner__side front";
    cardInnerBack.className = "cards_cnt__card__inner__side back";
    cardTextFront.className = "cards_cnt__card__inner__side__text";
    cardTextBack.className = "cards_cnt__card__inner__side__text";
    cardEditPanel.className =
      "cards_cnt__card__inner__side__edit-panel expanded";
    editIcon.src = "./images/edit-regular.svg";
    editIcon.alt = "edit icon";
    this.getDeleteIcon().src = "./images/trash-alt-regular.svg";
    this.getDeleteIcon().alt = "delete icon";

    cardTextFront.textContent = this.questionContent;
    cardTextBack.textContent = this.answerContent;

    editIconCnt.appendChild(editIcon);
    deleteIconCnt.appendChild(this.getDeleteIcon());
    cardEditPanel.appendChild(editIconCnt);
    cardEditPanel.appendChild(deleteIconCnt);
    cardInnerBack.appendChild(cardTextBack);
    cardInnerBack.appendChild(cardEditPanel);
    cardInnerFront.appendChild(cardTextFront);
    cardInner.appendChild(cardInnerFront);
    cardInner.appendChild(cardInnerBack);

    this.getCardElement().appendChild(cardInner);
    this.getCardElement().id = this.id;
    cardCnt.appendChild(this.getCardElement());
  }

  removeCardFromArr(arr) {
    arr.splice(this.id, 1);
  }

  resetIndex(arr) {
    arr.forEach((element, index) => (element.id = index));
  }

  resetElementAttrIndex() {
    const cards = document.querySelectorAll(".cards_cnt__card");
    cards.forEach((element, index) => {
      element.setAttribute("id", index);
    });
    console.log(cards);
  }

  deleteCard(arr) {
    this.getDeleteIcon().addEventListener("click", () => {
      this.removeCardFromArr(arr);
      this.resetIndex(arr);
      this.getCardElement().remove();
      this.resetElementAttrIndex();
      Storage.setStorage("cards", arr);
    });
  }
}
