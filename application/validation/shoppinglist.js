const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function ValidateShoppingListInput(data) {
  let errors = {};

  data.item = !isEmpty(data.item) ? data.item : "";

  if (Validator.isEmpty(data.item)) {
    errors.item = "Item field is required"
  }

  if (!Validator.isLength(data.item, { min: 1, max: 100 })) {
    errors.item = "Item must be between 1 and 100 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}