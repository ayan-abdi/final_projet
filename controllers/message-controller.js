const { Op } = require("sequelize");
const db = require("../models");
const { NotFoundErrorRes, ErrorRes } = require("../schemas/error-schema");
const { SuccessObjectRes } = require("../schemas/succes-schema");

const messageController = {
  getById: async (req, res) => {
    const id = parseInt(req.params.id);

    const message = await db.Messages.findByPk(id, {
      include: {
        model: db.Members,
        attributes: ["id", "pseudo"],
      },
      attributes: {
        exclude: ["memberId"],
      },
    });
    if (!message) {
      return res.status(404).json(new NotFoundErrorRes("Message not found Id"));
    }
    res.json(new SuccessObjectRes(message));
  },
  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const memberId = req.user.id; //<= userId me renvoie l'id de l'auteur du message
    const data = req.validData; //Renvoie le contain de la requete sur insomnia

    const [nbRow, updatedData] = await db.Messages.update(data, {
      where: {
        [Op.and]: [{ id }, { memberId }],
      },
      returning: true,
    });

    if (nbRow !== 1) {
      return res.status(400).json(new ErrorRes("Error during update"));
    }

    res.json(new SuccessObjectRes(updatedData));
  },
  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    const memberId = req.user.id;

    const target = await db.Messages.findByPk(id);

    if (!target) {
      return res
        .status(404)
        .json(new NotFoundErrorRes("message not found for delete"));
    }

    if (target.memberId !== memberId) {
      return res.sendStatus(403);
    }

    await target.destroy();

    res.sendStatus(204);
  },
};

module.exports = messageController;
