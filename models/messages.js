const { Sequelize, DataTypes } = require("sequelize");

/**
 * Représentation du model Category
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {
  const Messages = sequelize.define("messages", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  });
  return Messages;
};
