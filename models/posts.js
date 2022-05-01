const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Initialisation de mon model Posts
  const Posts = sequelize.define("subject", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // console.log(posts === sequelize.models.posts);
  return Posts;
};
