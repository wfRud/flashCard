import Storage from "./_Storage";

export default class Form {
  constructor(maxLength) {
    this.getForm = () => _form;
    this.getFormInputs = () => _formInputs;
    this.getMaxLength = () => _maxLength;
    this.getCheckedInputs = () => _checkedInputs;
    this.getQuestionInput = () => _questionInput;
    this.getAnswerInput = () => _answerInput;
    this.getCategoryInput = () => _categoryInput;

    const _maxLength = maxLength,
      _form = document.getElementById("addCardForm"),
      _formInputs = document.querySelectorAll("[name=form-input]"),
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

    this.setInputStorage = (input) =>
      input.addEventListener("input", () =>
        Storage.setStorage(input.id, input.value)
      );

    this.getInputStorage = (input) => {
      input.value = Storage.getStorage(input.id);
    };

    this.clearForm = () => {
      // Clear fields
      this.getQuestionInput().value = "";
      this.getAnswerInput().value = "";
      this.getCategoryInput().value = "";
      this.getCheckedInputs().length = 0;

      // Clear Storage
      Storage.removeStorage(this.getQuestionInput().id);
      Storage.removeStorage(this.getAnswerInput().id);

      // Clear Radio inputs
      for (let radio of this.isChecked()) {
        radio.checked = false;
      }
    };

    this.inputsValids = () => {
      let isValid = false;
      let isChecked = false;

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
          if (!isChecked) {
            const label = document.querySelector(
              ".main_panel__form__checkboxes-cnt"
            );
            label.previousElementSibling.textContent =
              label.previousElementSibling.dataset.warning;
            label.previousElementSibling.classList.add("warning");
          } else {
            const label = document.querySelector(
              ".main_panel__form__checkboxes-cnt"
            );
            label.previousElementSibling.textContent =
              label.previousElementSibling.dataset.content;
            label.previousElementSibling.classList.remove("warning");
          }
        }
      });

      if (isChecked) {
        for (let radio of this.isChecked()) {
          this.getCheckedInputs().push(radio.value);
        }
      }
      console.log(`isValid = ${isValid} || isChecked = ${isChecked}`);

      if (isValid && isChecked) {
        return true;
      } else {
        this.clearForm();
        return false;
      }
    };
  }
}
