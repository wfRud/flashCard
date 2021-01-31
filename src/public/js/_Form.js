import Storage from "./_Storage";

export default class Form {
  constructor(maxLength) {
    this.getForm = () => _form;
    this.getFormInputs = () => _formInputs;
    this.getCheckBoxesCnt = () => _checkBoxesCnt;
    this.getMaxLength = () => _maxLength;
    this.getCheckedInputs = () => _checkedInputs;
    this.getQuestionInput = () => _questionInput;
    this.getAnswerInput = () => _answerInput;
    this.getCategoryInput = () => _categoryInput;
    this.editFlag = false;

    const _maxLength = maxLength,
      _form = document.getElementById("addCardForm"),
      _formInputs = document.querySelectorAll("[data-role]"),
      _checkBoxesCnt = document.getElementById("checkboxes-cnt"),
      _checkedInputs = [],
      _questionInput = this.getFormInputs()[0],
      _answerInput = this.getFormInputs()[1],
      _categoryInput = this.getFormInputs()[2];

    this.isNotEmpty = (field) => field.value !== "";

    this.isAtLeast = (field, max) => {
      return field.value.length <= max;
    };

    this.isChecked = () => {
      const isChecked = document.querySelectorAll("[type=checkbox]:checked");
      return isChecked;
    };

    this.getCategories = () => {
      const categories = [];

      if (!!this.getCategoryInput().value) {
        categories.push(...this.getCategoryInput().value.split(","));
      }
      if (this.isChecked()) {
        for (let radio of this.isChecked()) {
          // !! Jade has stopped render value attr corectly, use input's id attr instead
          categories.push(radio.id);
          // categories.push(radio.value);
        }
      }

      return categories;
    };

    this.setInputStorage = (inputs) =>
      inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
          if (e.target.type === "checkbox") {
            Storage.setStorage(input.id, input.id);
          } else {
            Storage.setStorage(input.id, input.value);
          }
        });
      });

    this.getInputStorage = (inputs) => {
      inputs.forEach((input) => {
        const isStorage = Storage.getStorage(input.id);
        if (isStorage && input.type === "checkbox") {
          const checkBoxes = document.querySelectorAll(
            `#${Storage.getStorage(input.id)}`
          );
          checkBoxes.forEach((checkBox) =>
            checkBox.setAttribute("checked", "checked")
          );
        }
        input.value = Storage.getStorage(input.id);
      });
    };

    this.clearForm = () => {
      // Clear fields
      this.getQuestionInput().value = "";
      this.getAnswerInput().value = "";
      this.getCategoryInput().value = "";
      this.getCheckedInputs().length = 0;

      // Clear Storage
      Storage.clearAllStorage();

      // Clear Radio inputs
      for (let radio of this.isChecked()) {
        radio.checked = false;
      }
    };

    this.inputsValid = () => {
      let isValid = false;
      let isChecked = false;
      let newCategory = this.getCategoryInput().value;

      this.getFormInputs().forEach((item) => {
        if (item.type === "textarea") {
          isValid =
            this.isNotEmpty(item) && this.isAtLeast(item, this.getMaxLength());

          if (!isValid) {
            item.previousElementSibling.textContent = item.dataset.error;
            item.classList.add("error");
            item.previousElementSibling.classList.add("error");
          } else {
            item.previousElementSibling.textContent = item.dataset.content;
            item.classList.remove("error");
            item.previousElementSibling.classList.remove("error");
          }
        } else if (item.type === "checkbox") {
          isChecked = !!this.isChecked().length;

          if (!isChecked && !newCategory) {
            const label = document.querySelector(
              ".main_panel__form__checkboxes-cnt"
            ).previousElementSibling;
            label.textContent = label.dataset.warning;
            label.classList.add("warning");
          } else {
            const label = document.querySelector(
              ".main_panel__form__checkboxes-cnt"
            ).previousElementSibling;
            label.textContent = label.dataset.content;
            label.classList.remove("warning");
          }
        }
      });

      if (isValid && (isChecked || !!newCategory)) {
        return true;
      } else {
        this.clearForm();
        return false;
      }
    };
  }
}
