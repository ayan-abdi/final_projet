const { Sequelize, DataTypes } = require("sequelize");
/**
 *
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {
  // Initialisation de mon model SubjectCat
  const postsCat = sequelize.define(
    "postsCat",
    {},
    {
      timestamps: false,
      tableName: "PostsThemes",
    }
  );
  //   console.log(PostsCat === sequelize.models.PostsCat);
  return postsCat;
};
