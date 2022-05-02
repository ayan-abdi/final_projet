const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Messages = sequelize.define("messages", {
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  });
  return Messages;
};
