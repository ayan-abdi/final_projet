const postsController = require("../controllers/posts-controller");
const bodyValideted = require("../middlewares/body-validation");
const postsRouter = require("express").Router();
const postsValidatorAdd = require("../validators/postsValidator");

postsRouter
  .route("/")
  .get(postsController.getAll)
  .post(bodyValideted(postsValidatorAdd), postsController.add);

module.exports = postsRouter;
