const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function ValidateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "Comment field is required"
  }

  if (!Validator.isLength(data.text, { min: 1, max: 300 })) {
    errors.text = "Comment must be between 1 and 300 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}