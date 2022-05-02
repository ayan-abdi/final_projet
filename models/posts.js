const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Initialisation de mon model Posts
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // tableName: "Posts",
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
  });
  // console.log(posts === sequelize.models.posts);
  return Posts;
};
