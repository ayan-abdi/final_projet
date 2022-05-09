const { Sequelize, DataTypes } = require("sequelize");

/**
 * Représentation du model Category
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {
  // Initialisation de mon model Posts
  const themes = sequelize.define(
    "themes",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "UK_Themes__Name",
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  //   console.log(themes === sequelize.models.themes);
  return themes;
};
