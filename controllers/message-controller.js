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
    const data = req.validData;
    data.userId = req.user.id;

    const [nbRow, updatedData] = await db.Messages.update(data, {
      where: {
        [Op.and]: [{ id }, { isAdmin }],
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
    const isAdmin = req.user.id;

    const target = await db.Messages.findByPk(id);

    if (!target) {
      return res
        .status(404)
        .json(new NotFoundErrorRes("message not found for delete"));
    }

    if (target.memberId !== isAdmin) {
      return res.sendStatus(403);
    }

    // Bien joué Ayan!
    await target.destroy();

    res.sendStatus(204);
  },
};

module.exports = messageController;
