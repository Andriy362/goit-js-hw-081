const throttle = require('lodash.throttle');
let formData = {};

const formEl = document.querySelector('form');
formEl.addEventListener('submit', notOpenNewPage);
formEl.addEventListener('input', throttle(onFormInput, 500));

const STORAGE_KEY = 'feedback-form-state';

const localData = localStorage.getItem(STORAGE_KEY);

if (localData) {
  formData = JSON.parse(localData);

  for (let key in formData) {
    formEl.elements[key].value = formData[key];
  }
}

function notOpenNewPage(evt) {
  evt.preventDefault();

  evt.target.reset();

  localStorage.removeItem(STORAGE_KEY);

  console.log(formData);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
