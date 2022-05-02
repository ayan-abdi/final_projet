const yup = require("yup");

const themesValidator = yup.object().shape({
  title: yup.string().required().max(50),
  content: yup.string().required().max(2000),
});

module.exports = themesValidator;
