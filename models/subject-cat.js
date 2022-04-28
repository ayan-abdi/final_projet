const { Sequelize, DataTypes } = require("sequelize");
/**
 *
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {
  // Initialisation de mon model SubjectCat
  const SubjectCat = sequelize.define(
    "subjectCat",
    {},
    {
      timestamps: false,
      tableName: "subjectCategories",
    }
  );
  //   console.log(SubjectCat === sequelize.models.SubjectCat);
  return SubjectCat;
};
