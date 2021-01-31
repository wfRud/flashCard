import User from "./_User";

export default class App {
  constructor() {
    if (location.pathname === "/user/dashboard") {
      this.initialize();
    }
  }
  async initialize() {
    const response = await fetch("http://localhost:3000/api/dashboard");
    const json = await response.json();
    const { login, cards, categories } = json;

    this.user = new User(login, cards, categories);

    this.user.form.getInputStorage(this.user.form.getFormInputs());
    this.user.form.setInputStorage(this.user.form.getFormInputs());

    this.user.form.getForm().addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.user.form.editFlag) {
        this.user.addCard();
      } else {
        this.user.updateCard();
      }
    });
  }
}
