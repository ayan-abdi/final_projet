const postsRouter = require("./posts-router");

const router = require("express").Router();

router.use("/posts", postsRouter);

module.exports = router;
