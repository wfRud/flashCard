// ===Style===
import "../scss/style.scss";
import "bootstrap";

// ===Icons===

import "../images/Logo.svg";
import "../images/plus-solid.svg";
import "../images/heart-solid.svg";
import "../images/angle-left-solid.svg";
import "../images/angle-right-solid.svg";
import "../images/edit-regular.svg";
import "../images/trash-alt-regular.svg";

// ===JS===
import "./_customAnimation";
import Card from "./_Card";
import Form from "./_Form";

const card = new Card(1, "asdasd", "Asdasda", "test", "2020-02-23");
const form = new Form(150);

console.log(card);
console.log(form);

// console.log(form.formValidation());
// console.log(form.checkValidation());
