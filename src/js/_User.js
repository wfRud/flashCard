export default class User {
  constructor(userName, userSurname) {
    this.userName = userName;
    this.userSurname = userSurname;

    const _cards = [],
      _categories = [];

    this.getCards = () => _cards;
    this.setCards = (card) => this.getCards().push(card);

    this.getCategories = () => _categories;
    this.setCategories = (category) => this.getCategories().push(category);
  }
}
