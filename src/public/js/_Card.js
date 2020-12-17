import Storage from "./_Storage";

export default class Card {
  constructor(id, questionContent, answerContent, category) {
    this.id = id;
    this.questionContent = questionContent;
    this.answerContent = answerContent;
    this.category = category;

    const _card = document.createElement("div"),
      _deleteIcon = document.createElement("img"),
      _editIcon = document.createElement("img");

    this.getCardElement = () => _card;
    this.getDeleteIcon = () => _deleteIcon;
    this.getEditIcon = () => _editIcon;
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
      deleteIconCnt = document.createElement("span");

    this.getCardElement().className = "cards_cnt__card";
    cardInner.className = "cards_cnt__card__inner";
    cardInnerFront.className = "cards_cnt__card__inner__side front";
    cardInnerBack.className = "cards_cnt__card__inner__side back";
    cardTextFront.className = "cards_cnt__card__inner__side__text";
    cardTextBack.className = "cards_cnt__card__inner__side__text";
    cardEditPanel.className =
      "cards_cnt__card__inner__side__edit-panel expanded";
    this.getEditIcon().src = "./images/edit-regular.svg";
    this.getEditIcon().alt = "edit icon";
    this.getDeleteIcon().src = "./images/trash-alt-regular.svg";
    this.getDeleteIcon().alt = "delete icon";

    cardTextFront.textContent = this.questionContent;
    cardTextBack.textContent = this.answerContent;

    editIconCnt.appendChild(this.getEditIcon());
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
  }

  deleteCard(arr) {
    this.getDeleteIcon().addEventListener("click", () => {
      let that = this;
      this.removeCardFromArr(arr);
      this.resetIndex(arr);

      this.getCardElement().classList.add("delete");
      setTimeout(function () {
        that.getCardElement().remove();
      }, 300);

      this.resetElementAttrIndex();
      Storage.setStorage("cards", arr);
    });
  }

  editCard() {
    this.getEditIcon().addEventListener("click", (e) => {
      console.log("edit");
    });
  }
}
