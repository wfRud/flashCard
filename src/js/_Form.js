// import { Card } from "./_Card";

export default class Form {
  constructor(maxLength) {
    const _maxLength = maxLength,
      _form = document.getElementById("addCardForm"),
      _formInputs = document.querySelectorAll("[name=form-input]");

    this.getForm = () => _form;
    this.getFormInputs = () => _formInputs;
    this.getMaxLength = () => _maxLength;

    this.isNotEmpty = (field) => field.value !== "";
    this.isAtLeast = (field, max) => {
      return field.value.length <= max;
    };
    this.isChecked = () => {
      const isChecked = document.querySelectorAll("[type=checkbox]:checked");
      return isChecked.length ? true : false;
    };

    this.inputsValids = () => {
      let isValid = false;
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
          isValid = this.isChecked();
          if (!isValid) {
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
      return isValid;
    };

    this.getForm().addEventListener("submit", this.submitForm.bind(this));
  }

  submitForm(e) {
    e.preventDefault();

    if (this.inputsValids()) {
      console.log("dodaję kartę");
    }
  }
}
