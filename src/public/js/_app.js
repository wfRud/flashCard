import User from "./_User";
import Card from "./_Card";
import Form from "./_Form";
import Storage from "./_Storage";

export default class App {
  constructor() {
    this.user = new User("Janek", "Kowalski");
    this.form = new Form(150);

    this.user.updateCards(Storage.getStorage("cards"));

    this.form.getInputStorage(this.form.getQuestionInput());
    this.form.getInputStorage(this.form.getAnswerInput());
    this.form.setInputStorage(this.form.getQuestionInput());
    this.form.setInputStorage(this.form.getAnswerInput());

    this.form.getForm().addEventListener("submit", this.sendForm.bind(this));
    this.renderCards(Storage.getStorage("cards"));
  }

  sendForm(e) {
    e.preventDefault();
    if (this.form.inputsValids()) {
      const card = new Card(
        this.user.getCards().length,
        this.form.getQuestionInput().value,
        this.form.getAnswerInput().value,
        [...this.form.getCheckedInputs()]
      );

      this.user.setCards(card);
      Storage.setStorage("cards", this.user.getCards());
      card.createCard();
      card.deleteCard(this.user.getCards());
      card.editCard();
      this.form.clearForm();
    }
  }

  renderCards(cards) {
    if (cards) {
      cards.forEach((item) => {
        const card = new Card(
          item.id,
          item.questionContent,
          item.answerContent,
          item.category
        );
        card.createCard();
        card.deleteCard(this.user.getCards());
        card.editCard();
      });
    }
  }
}
