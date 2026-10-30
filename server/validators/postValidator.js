const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  content: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "content"),
    },
    isLength: {
      options: { min: 2, max: 200 },
      errorMessage: formatValidationError("length", "content", {
        min: 2,
        max: 200,
      }),
    },
  },
  image: {
    optional: true,
  },
  userId: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "userId"),
    },
  },
});
