const { Sequelize, DataTypes } = require("sequelize");

/**
 * Représentation du model Category
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {
  // Initialisation de mon model Posts
  const Themes = sequelize.define(
    "Themes",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        // tableName: "Themes",
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
  return Themes;
};
