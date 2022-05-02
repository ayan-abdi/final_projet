const yup = require("yup");

const messagesValidator = yup.object().shape({
  content: yup.string().trim().max(1000).required(),
});

module.exports = messagesValidator;
