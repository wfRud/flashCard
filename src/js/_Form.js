export default class Form {
  constructor(maxLength) {
    this.getForm = () => _form;
    this.getFormInputs = () => _formInputs;
    this.getMaxLength = () => _maxLength;
    this.getCheckedInputs = () => _checkedInputs;
    this.getQuestionInput = () => _questionInputValue;
    this.getAnswerInput = () => _answerInputValue;
    this.getCategoryInput = () => _categoryInputValue;

    const _maxLength = maxLength,
      _form = document.getElementById("addCardForm"),
      _formInputs = document.querySelectorAll("[name=form-input]"),
      _checkedInputs = [],
      _questionInputValue = this.getFormInputs()[0],
      _answerInputValue = this.getFormInputs()[1],
      _categoryInputValue = this.getFormInputs()[2];

    this.isNotEmpty = (field) => field.value !== "";
    this.isAtLeast = (field, max) => {
      return field.value.length <= max;
    };
    this.isChecked = () => {
      const isChecked = document.querySelectorAll("[type=checkbox]:checked");
      return isChecked;
    };

    this.clearForm = () => {
      this.getQuestionInput().value = "";
      this.getAnswerInput().value = "";
      this.getCategoryInput().value = "";
      this.getCheckedInputs().length = 0;

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
            const label = document.querySelector(".checkboxes-cnt_label");
            label.textContent = label.dataset.warning;
            label.classList.add("warning");
          } else {
            const label = document.querySelector(".checkboxes-cnt_label");
            label.textContent = label.dataset.content;
            label.classList.remove("warning");
          }
        }
      });

      if (isChecked) {
        for (let radio of this.isChecked()) {
          this.getCheckedInputs().push(radio.value);
        }
      }

      if (isValid && isChecked) {
        return true;
      } else {
        this.clearForm();
        return false;
      }
    };
  }
}
