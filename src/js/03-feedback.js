// const throttle = require('lodash.throttle');

// const formEl = document.querySelector('form');

// formEl.addEventListener('submit', notOpenNewPage);

// const STORAGE_KEY = 'feedback-form-state';

// function notOpenNewPage(evt) {
//   evt.preventDefault();

//   console.log('last');
//   evt.target.reset();

//   localStorage.removeItem(STORAGE_KEY);
// }

// function textreal() {
//   const saveMessage = localStorage.getItem(STORAGE_KEY);
//   if (saveMessage) {
//     formEl.value = saveMessage;
//   }
// }

import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form  textarea'),
  input: document.querySelector('.feedback-form  input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(savingData, 500));

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

function savingData(event) {
  formData[event.target.name] = event.target.value;
  console.log(formData);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

addEventListener('DOMContentLoaded', populateTextarea);

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    try {
      objectMessage = JSON.parse(savedMessage);

      refs.input.value = objectMessage.email;
      refs.textarea.value = objectMessage.message;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    refs.input.value = '';
    refs.textarea.value = '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  // clearing a form when submit
  evt.currentTarget.reset();

  // removing storageKey info from the localStorage
  localStorage.removeItem(STORAGE_KEY);
}
