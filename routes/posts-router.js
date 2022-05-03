const postsController = require("../controllers/posts-controller");
const { authentificateJwt } = require("../middlewares/authentificate-jwt");
const bodyValideted = require("../middlewares/body-validation");
const postsRouter = require("express").Router();
const {postsValidatorAdd, postsCatValidator, postsValidatorUpdate} = require("../validators/postsValidator");



postsRouter
  .route("/")
  .get(postsController.getAll)
  .post(authentificateJwt(), bodyValideted(postsValidatorAdd), postsController.add);

postsRouter.route("/:id([0-9]+)")
  .get(postsController.getOne)
  .put(authentificateJwt(), bodyValideted(postsValidatorUpdate), postsController.update)
  .delete(authentificateJwt(), bodyValideted(postsValidatorAdd), postsController.add);

postsRouter.route("/:id([0-9]+)/addThemes")
  .post(authentificateJwt(), bodyValideted(postsCatValidator), postsController.addThemes);
postsRouter.route("/:id([0-9]+)/removeThemes")
  .put(authentificateJwt(), bodyValideted(postsCatValidator), postsController.removeThemes);

module.exports = postsRouter;
