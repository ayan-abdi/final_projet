const { db } = require("../models");

const subjectController = {
  // Actions principaux
  getAll: async (req, res) => {
    // Ajout de pagination avec offset et limit

    const { rows, count } = await db.Subject.findAndCountAll({
      distinct: true, // Fix le probleme de count (Permet de ne pas compter les ligne d'un INNER JOIN)

      // include: db.Categories           // Many to Many avec toutes les infos (donc la table intermediaire)
      include: [
        {
          // Many to Many customisé
          model: db.Categories,
          through: { attributes: [] }, // -> Permet de selectionner les infos de toutes les tables intermediaires
        },
        {
          model: db.Members,
          attributes: ["id", "pseudo"],
        },
      ],
    });
    res.json(rows, count);
  },
  add: async (req, res) => {

        // Rescuperation des données
        const data = req.
    }
};
