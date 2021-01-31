import Form from "./_Form";
import Card from "./_Card";

export default class User {
  constructor(login, cards, userCategories) {
    this.login = login;
    this.form = new Form(150);

    const _cards = this.renderCards(cards),
      _userCategories = userCategories;

    this.getCards = () => _cards;
    this.getCategories = () => _userCategories;
  }

  addCard() {
    if (this.form.inputsValid()) {
      const timeStamp = new Date().valueOf();
      const card = new Card(
        timeStamp,
        this.form.getQuestionInput().value,
        this.form.getAnswerInput().value,
        this.form.getCategories()
      );
      if (this.form.getCategoryInput().value) {
        this.renderCategories(
          this.form.getCategoryInput().value,
          this.form.getCheckBoxesCnt()
        );
      }
      this.getCards().push(card);

      card.createCard();
      card.deleteCard();
      card.editCard(this.form);

      this.sendCards(card);
      this.form.clearForm();
    }
  }

  sendCards(card) {
    fetch("http://localhost:3000/user/dashboard", {
      method: "POST",
      body: JSON.stringify(card),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        card.showMessage(data.msg, "added");
      })
      .catch((err) => console.log(err));
  }

  updateCard() {
    const editedCard = this.getEditedCard();

    editedCard.updateCardData(this.form);

    try {
      const cardId = editedCard.id_card;
      fetch(`http://localhost:3000/user/dashboard/${cardId}`, {
        method: "PUT",
        body: JSON.stringify(editedCard),
        headers: { "Content-type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          editedCard.updateCardContent(this.form);
          editedCard.resetEditDetails(this.form);
          editedCard.showMessage(data.msg, "edit");
          this.form.editFlag = false;
        });
    } catch (error) {
      console.log(error);
    }
  }

  renderCategories(category, cnt) {
    const label = document.createElement("label"),
      checkBox = document.createElement("input");

    label.htmlFor = category;
    label.textContent = category;

    checkBox.type = "checkbox";
    checkBox.name = "radio";
    checkBox.id = category;
    checkBox.value = category;
    checkBox.dataset.role = "form-input";

    label.appendChild(checkBox);
    cnt.appendChild(label);
  }

  renderCards(cards) {
    if (cards) {
      const renderedCards = [];
      cards.forEach((item) => {
        const card = new Card(
          item.id_card,
          item.questionContent,
          item.answerContent,
          item.cardCategories
        );
        card.createCard();
        card.deleteCard();
        card.editCard(this.form);
        renderedCards.push(card);
      });
      return renderedCards;
    }
  }

  clearCardsCnt() {
    const cardsElement = document.querySelectorAll(".cards_cnt__card");
    cardsElement.forEach((cardElement) => cardElement.remove());
  }

  getEditedCard() {
    return this.getCards().find((obj) => obj.edited);
  }
}
