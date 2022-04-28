const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Initialisation de mon model Posts
  const Categories = sequelize.define("categories", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //   console.log(Categories === sequelize.models.Categories);
  return Categories;
};
