const postsController = require("../controllers/posts-controller");
const { authentificateJwt } = require("../middlewares/authentificate-jwt");
const bodyValideted = require("../middlewares/body-validation");
const messagesValidator = require("../validators/messagesValidator");
const postsRouter = require("express").Router();
const {
  postsValidatorAdd,
  postsCatValidator,
  postsValidatorUpdate,
} = require("../validators/postsValidator");

postsRouter
  .route("/")
  .get(postsController.getAll)
  .post(
    authentificateJwt(),
    bodyValideted(postsValidatorAdd),
    postsController.add
  );

postsRouter
  .route("/:id([0-9]+)")
  .get(postsController.getOne)
  .put(
    authentificateJwt(),
    bodyValideted(postsValidatorUpdate),
    postsController.update
  )
  .delete(
    authentificateJwt(),
    bodyValideted(postsValidatorAdd),
    postsController.add
  );

postsRouter
  .route("/:id([0-9]+)/addThemes")
  .post(
    authentificateJwt(),
    bodyValideted(postsCatValidator),
    postsController.addThemes
  );
postsRouter
  .route("/:id([0-9]+)/removeThemes")
  .put(
    authentificateJwt(),
    bodyValideted(postsCatValidator),
    postsController.removeThemes
  );
postsRouter
  .route("/:id([0-9]+)/message")
  .get(postsController.getAllMessages)
  .post(
    authentificateJwt(),
    bodyValideted(messagesValidator),
    postsController.addMessage
  );

module.exports = postsRouter;
