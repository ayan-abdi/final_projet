const { Sequelize, DataTypes } = require("sequelize");

/**
 * Représentation du model Category
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {
  // Initialisation de mon model Posts
  const Members = sequelize.define(
    "members",
    {
      pseudo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: "UK_Member_Pseudo",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "UK_Member_Email",
      },
      password: {
        type: DataTypes.CHAR(60),
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  );
  //   console.log(subject === sequelize.models.subject);
  return Members;
};
