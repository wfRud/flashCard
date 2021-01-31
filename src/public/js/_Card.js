export default class Card {
  constructor(id, questionContent, answerContent, cardCategories) {
    this.id_card = id;
    this.questionContent = questionContent;
    this.answerContent = answerContent;
    this.cardCategories = cardCategories;

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
    this.getEditIcon().src = "/images/edit-regular.svg";
    this.getEditIcon().alt = "edit icon";
    this.getDeleteIcon().src = "/images/trash-alt-regular.svg";
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

  deleteCard() {
    this.getDeleteIcon().addEventListener("click", () => {
      try {
        const cardId = this.id_card;
        fetch(`http://localhost:3000/user/dashboard/${cardId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            this.showMessage(data.msg, "delete");
          });

        this.getCardElement().classList.add("delete");
        setTimeout(() => {
          this.getCardElement().remove();
        }, 300);
      } catch (error) {
        console.log(error);
      }
    });
  }

  setEditDetails() {
    const mainPanel = document.querySelector(".main_panel"),
      expandBtn = document.querySelector(".main_panel__add__icon"),
      addBtn = document.querySelector(".btn"),
      mainPanelText = document.querySelector(".main_panel__add__text");

    mainPanel.classList.add("edit");
    expandBtn.classList.add("edit");
    addBtn.classList.add("edit");
    addBtn.textContent = "Edit Card";
    mainPanelText.textContent = "Edit Card";
  }

  setEditFormContent(form) {
    form.getQuestionInput().value = this.questionContent;
    form.getAnswerInput().value = this.answerContent;

    this.cardCategories.forEach((category) => {
      const checkBox = document.getElementById(category);
      checkBox.checked = true;
    });
  }

  resetEditDetails(form) {
    const mainPanel = document.querySelector(".main_panel"),
      expandBtn = document.querySelector(".main_panel__add__icon"),
      addBtn = document.querySelector(".btn"),
      mainPanelText = document.querySelector(".main_panel__add__text"),
      cardPanelForm = document.querySelector(".main_panel__form");

    cardPanelForm.classList.remove("expanded");
    mainPanel.classList.remove("edit");
    expandBtn.classList.remove("edit");
    addBtn.classList.remove("edit");
    addBtn.textContent = "Add Card";
    mainPanelText.textContent = "Add Card";

    form.clearForm();
  }

  updateCardData(form) {
    this.questionContent = form.getQuestionInput().value;
    this.answerContent = form.getAnswerInput().value;
    this.cardCategories = form.getCategories();

    delete this.edited;
  }

  updateCardContent(form) {
    const questionText = this.getCardElement().querySelector(
      ".cards_cnt__card__inner__side.front"
    );
    const answerText = this.getCardElement().querySelector(
      ".cards_cnt__card__inner__side.back"
    );

    questionText.firstChild.textContent = form.getQuestionInput().value;
    answerText.firstChild.textContent = form.getAnswerInput().value;
  }

  editCard(form) {
    this.getEditIcon().addEventListener(
      "click",
      () => {
        if (!this.edited) {
          // clear form checkboxes
          for (let radio of form.isChecked()) {
            radio.checked = false;
          }

          const cardPanelForm = document.querySelector(".main_panel__form");
          cardPanelForm.classList.add("expanded");

          form.editFlag = true;
          this.edited = true;

          this.setEditDetails();
          this.setEditFormContent(form);
        } else {
          form.editFlag = false;
          delete this.edited;
          this.resetEditDetails(form);
        }
      },
      false
    );
  }

  showMessage(msg, type) {
    const hasShowed = document.querySelector(".main_panel__add__text--msg ");
    if (!hasShowed) {
      const msgElement = document.createElement("p");
      const mainPanel = document.querySelector(".main_panel__add");
      const addBtn = document.querySelector(".main_panel__add__icon");

      msgElement.textContent = msg;
      msgElement.className = `main_panel__add__text--msg ${type}`;

      mainPanel.insertBefore(msgElement, addBtn);

      setTimeout(() => {
        msgElement.remove();
      }, 3000);
    }
  }
}
