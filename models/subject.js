const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Initialisation de mon model Posts
  const Subject = sequelize.define("subject", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // console.log(Subject === sequelize.models.Subject);
  return Subject;
};
