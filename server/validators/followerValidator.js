const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  followedId: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "followedId"),
    },
  },
});
