const { Sequelize } = require("sequelize");

// Initialisation de sequelize
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: "mssql",
    pool: {
      min: 0,
      max: 5,
      idle: 10_000,
      acquire: 30_000,
    },
  }
);

// Creation de l'objet db
const db = {};

// Ajout de Sequelize
db.sequelize = sequelize;

// Ajout des models
db.Posts = require("./posts")(sequelize);
// db.Categories = require("./categories")(sequelize);
db.Members = require("./members")(sequelize);
db.PostsCat = require("./post-cat")(sequelize);

// Ajout des assiciation
// [Many-to-Many] between subject and categories
// db.Posts.belongsToMany(db.Categories, { through: db.PostsCat });
// db.Categories.belongsToMany(db.Posts, { through: db.PostsCat });

// Export de ma db
module.exports = db;
