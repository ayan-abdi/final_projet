const subjectController = require("../controllers/subject-controler");
const bodyValideted = require("../middlewares/body-validation");
const subjectRouter = require("express").Router();
const subjectValidatorAdd = require("../validators/subjectValidator");

subjectRouter
  .route("/")
  .get(subjectController.getAll)
  .post(bodyValideted(subjectValidatorAdd), subjectController.add);

module.exports = subjectRouter;
