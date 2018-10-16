const Validator = require('validator');
const isEmpty = require('./isEmpty');
const isOneWord = require('./isOneWord');

module.exports = function ValidateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

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

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required"
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid"
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required"
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required"
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match"
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}