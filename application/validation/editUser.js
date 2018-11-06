const Validator = require('validator');
const isEmpty = require('./isEmpty');
const isOneWord = require('./isOneWord');

module.exports = function ValidateEditUserInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required"
  }

  if (!isOneWord(data.username)) {
    errors.username = "Username must be one word"
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}