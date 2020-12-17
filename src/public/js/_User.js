export default class User {
  constructor(userName, userSurname) {
    this.userName = userName;
    this.userSurname = userSurname;
    const _cards = [],
      _categories = [];

    this.getCards = () => _cards;
    this.setCards = (card) => this.getCards().push(card);
    this.updateCards = (storageCards) => {
      if (storageCards) {
        storageCards.forEach((element) => {
          this.getCards().push(element);
        });
      }
    };

    this.removeCardFromArr = (index) => this.getCards().splice(index, 1);
    this.resetIndex = (arr) =>
      arr.forEach((element, index) => (element.id = index));

    this.getCategories = () => _categories;
    this.setCategories = (category) => this.getCategories().push(category);
  }
}
