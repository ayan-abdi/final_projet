const subjectRouter = require("./subject-router");

const router = require("express").Router();

router.use("/subject", subjectRouter);

module.exports = router;
