const { Sequelize, DataTypes } = require("sequelize");

/**
 * Représentation du model Category
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {
  // Initialisation de mon model Posts
  const Posts = sequelize.define("posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
  });
  // console.log(posts === sequelize.models.posts);
  return Posts;
};
