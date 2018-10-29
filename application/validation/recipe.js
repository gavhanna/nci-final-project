const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function ValidateRecipeInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : "";
  data.method = !isEmpty(data.method) ? data.method : "";
  data.img_url = !isEmpty(data.img_url) ? data.img_url : "";
  data.serves = !isEmpty(data.serves) ? data.serves : "";
  data.preptime = !isEmpty(data.preptime) ? data.preptime : "";
  data.cooktime = !isEmpty(data.cooktime) ? data.cooktime : "";

  if (!Validator.isLength(data.title, { min: 3, max: 120 })) {
    errors.title = "Title must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required"
  }

  if (!Validator.isLength(data.desc, { min: 3, max: 120 })) {
    errors.desc = "Description must be between 3 and 120 characters";
  }

  if (Validator.isEmpty(data.desc)) {
    errors.desc = "Description field is required"
  }

  data.ingredients.forEach(i => {

    if (!Validator.isLength(i, { min: 3, max: 120 })) {
      errors.ingredients = "Ingredients must be between 3 and 120 characters";
    }

    if (Validator.isEmpty(i)) {
      errors.ingredients = "Ingredients field is required"
    }
  })

  data.method.forEach(m => {

    if (!Validator.isLength(m, { min: 3, max: 120 })) {
      errors.method = "Method must be between 3 and 120 characters";
    }

    if (Validator.isEmpty(m)) {
      errors.method = "Method field is required"
    }
  })

  if (!Validator.isURL(data.img_url)) {
    errors.img_url = "Image URL must be a valid URL";
  }

  if (Validator.isEmpty(data.serves)) {
    errors.serves = "Serves field is required"
  }
  if (Validator.isEmpty(data.preptime)) {
    errors.preptime = "Perperation time field is required"
  }
  if (Validator.isEmpty(data.cooktime)) {
    errors.cooktime = "Cooking time field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}