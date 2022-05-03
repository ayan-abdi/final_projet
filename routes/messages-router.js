const messageController = require("../controllers/message-controller");
const { authentificateJwt } = require("../middlewares/authentificate-jwt");
const bodyValideted = require("../middlewares/body-validation");
const messagesValidator = require("../validators/messagesValidator");

const messageRouter = require('express').Router();

messageRouter.route('/:id([0-9]+)')
    .get(messageController.getById)
    .put(authentificateJwt(), bodyValideted(messagesValidator), messageController.update)
    .delete(authentificateJwt(), bodyValideted(messagesValidator), messageController.delete);

module.exports = messageRouter;