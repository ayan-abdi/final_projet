const themesController = require("../controllers/themes-controller");
const authentificateJwt = require("../middlewares/authentificate-jwt");
const bodyValideted = require("../middlewares/body-validation");
const themesValidator = require("../validators/themesValidator");

const themeRouter = require("express").Router();

themeRouter
  .route("/")
  .get(themesController.getAll)
  .post(
    authentificateJwt({ adminRight: true }),
    bodyValideted(themesValidator),
    themesController.add
  );

themeRouter
  .route("/:id([0-9]+)")
  .get(themesController.getById)
  .put(
    authentificateJwt({ adminRight: false }),
    bodyValideted(themesValidator),
    themesController.update
  )
  .delete(
    authentificateJwt({ adminRight: false }),
    bodyValideted(themesValidator),
    themesController.delete
  );

module.exports = themeRouter;
