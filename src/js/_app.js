import User from "./_User";
import Card from "./_Card";
import Form from "./_Form";

export default class App {
  constructor() {
    this.user = new User("Janek", "Kowalski");
    this.form = new Form(150);

    this.form.getForm().addEventListener("submit", this.sendForm.bind(this));
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
      card.createCard();
      console.log(this.user.getCards());
      this.form.clearForm();
    }
  }

  renderCards(cards) {
    cards.forEach((card) => {
      card.createCard();
    });
  }
}
