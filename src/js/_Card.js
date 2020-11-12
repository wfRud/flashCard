export default class Card {
  constructor(id, questionContent, answerContent, category) {
    this.id = id;
    this.questionContent = questionContent;
    this.answerContent = answerContent;
    this.category = category;
  }

  createCard() {
    const cardCnt = document.querySelector(".cards_cnt"),
      card = document.createElement("div"),
      // hiddenCard = document.getElementById("hidden__card"),
      cardElements = `
                        <div class="cards_cnt__card__inner">
                          <div class="cards_cnt__card__inner__side front">
                            <p class="cards_cnt__card__inner__side__text">
                            ${this.questionContent}
                            </p>
                          </div>
                            <div class="cards_cnt__card__inner__side back">
                              <p class="cards_cnt__card__inner__side__text">
                              ${this.answerContent}
                              </p>
                              <div class="cards_cnt__card__inner__side__edit-panel expanded">
                                <span
                                  ><img src="./images/edit-regular.svg" alt="edi icon"
                                /></span>
                                <span
                                  ><img src="./images/trash-alt-regular.svg" alt="delete icon"
                                /></span>
                              </div>
                            </div>
                        </div>
                      `;

    card.className = "cards_cnt__card";
    card.innerHTML = cardElements;
    cardCnt.appendChild(card);
  }
}
