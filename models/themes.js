const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Initialisation de mon model Posts
  const Themes = sequelize.define("themes", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //   console.log(themes === sequelize.models.themes);
  return Themes;
};
