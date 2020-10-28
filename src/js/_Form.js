// import { Card } from "./_Card";

export default class Form {
  constructor(maxLength) {
    let _maxLength = maxLength;
    let _isValid = false;

    this.form = document.getElementById("addCardForm");
    this.formInputs = document.querySelectorAll("[name=form-input]");

    this.getValid = () => _isValid;

    this.getMaxLength = () => _maxLength;

    this.isNotEmpty = (field) => field.value !== "";

    this.isAtLeast = (field, max) => {
      return field.value.length <= max;
    };

    this.form.addEventListener("submit", this.formValidation.bind(this));
  }

  formValidation(e) {
    e.preventDefault();
    let isValid = this.getValid();
    let errors = [];

    this.formInputs.forEach((field) => {
      if (
        this.isNotEmpty(field) &&
        this.isAtLeast(field, this.getMaxLength())
      ) {
        isValid = true;
      } else {
        isValid = false;
      }

      if (!isValid) {
        field.classList.add("error");
        field.previousElementSibling.classList.add("error");
        field.previousElementSibling.textContent = `${
          field.dataset.error
        }${this.getMaxLength()} characters`;
        errors.push(field.dataset.error);
      } else {
        field.classList.remove("error");
        field.previousElementSibling.classList.remove("error");
        field.previousElementSibling.textContent = field.dataset.content;
      }
    });
    return errors;
  }
}
