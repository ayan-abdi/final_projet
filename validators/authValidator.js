const yup = require("yup");

const regexPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/;
// const regexPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{3,}$/;

const registerValidator = yup.object().shape({
  pseudo: yup.string().trim().required().min(3).max(50),
  email: yup.string().trim().lowercase().required().email().max(255),
  password: yup.string().required().matches(regexPwd),
});

const loginValidator = yup.object().shape({
  identity: yup.string().trim().required(),
  password: yup.string().required(),
  //   Pas necessaire d'avoir un regex pour un login qui est déja existant
});

module.exports = {
  registerValidator,
  loginValidator,
};
