const authController = require("../controllers/auth-controller");
const bodyValideted = require("../middlewares/body-validation");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

const authRouter = require("express").Router();

authRouter
  .route("/register")
  .post(bodyValideted(registerValidator), authController.register);

authRouter
  .route("/login")
  .post(bodyValideted(loginValidator), authController.login);

module.exports = authRouter;
