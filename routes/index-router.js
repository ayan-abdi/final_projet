const authRouter = require("./auth-router");
const messageRouter = require("./messages-router");
const postsRouter = require("./posts-router");
const themeRouter = require("./themes-router");

const router = require("express").Router();

router.use("/posts", postsRouter);
router.use('/themes', themeRouter); 
router.use('/auth', authRouter);
router.use('/messages', messageRouter);

module.exports = router;
