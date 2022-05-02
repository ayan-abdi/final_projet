const { Sequelize, DataTypes } = require("sequelize");

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
      timestamps: false,
    }
  );
  //   console.log(themes === sequelize.models.themes);
  return Themes;
};
