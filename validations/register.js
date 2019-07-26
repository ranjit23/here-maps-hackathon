const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "2 to 30 chars";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
