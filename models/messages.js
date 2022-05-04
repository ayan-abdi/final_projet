const { Sequelize, DataTypes } = require("sequelize");

/**
 * Représentation du model Category
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {
  const Messages = sequelize.define("messages", {
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  });
  return Messages;
};
