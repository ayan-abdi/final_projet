const db = require("../models");
const {
  SuccesArrayRes,
  SuccessObjectRes,
} = require("../schemas/succes-schema");

const postsController = {
  // Actions principaux
  getAll: async (req, res) => {
    // Ajout de pagination avec offset et limit
    const { rows, count } = await db.Posts.findAndCountAll({
      distinct: true,

      // include: db.Categories           // Many to Many avec toutes les infos (donc la table intermediaire)
      include: [
        {
          model: db.Categories,
          through: { attributes: [] },
        },
      ],
    });
    res.json(new SuccesArrayRes(rows, count)); //  <= injecter ici un schema de reponse
  },
  add: async (req, res) => {
    // Recuperation des données à ajouter dans la DB
    const data = req.validData;

    //  Recuperation des données lié au login
    data.memberId = req.user.id;

    // Ajouter des transaction pour securiser les op DB
    const transaction = await db.sequelize.transaction();

    try {
      // Ajout d'un element subject
      const postsAdded = await db.sequelize.create(data, { transaction });

      // Ajout d'un element categories via l'id(if existed id)
      await postsAdded.addCategories(data.Categories, { transaction });

      await transaction.commit();

      res.json(new SuccessObjectRes(postsAdded)); // <=> Si on met pas le status d
    } catch (error) {
      // Retour à l'etat initial
      await transaction.rollback();

      throw error;
    }
  },
};

module.exports = postsController;
