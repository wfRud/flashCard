export default class Card {
  constructor(id, questionContent, answerContent, category) {
    this.id = id;
    this.questionContent = questionContent;
    this.answerContent = answerContent;
    this.category = category;
  }

  createCard() {
    console.log(this.questionContent);
    console.log(this.questionAnswer);
  }
}
