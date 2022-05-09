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
db.Members = require("./members")(sequelize);
db.PostsCat = require("./post-cat")(sequelize);
db.themes = require("./themes")(sequelize);
db.Messages = require("./messages")(sequelize);

// Ajout des assiciation
// [One-to-Many] Posts-Members
db.Members.hasMany(db.Posts);
db.Posts.belongsTo(db.Members);
// Messages - Members[One - to - many];
db.Members.hasMany(db.Messages);
db.Messages.belongsTo(db.Members);
// Messages-Posts  [One-to-many]
db.Posts.hasMany(db.Messages);
db.Messages.belongsTo(db.Posts);
// [Many-to-Many] between Posts and themes
db.Posts.belongsToMany(db.themes, { through: db.PostsCat });
db.themes.belongsToMany(db.Posts, { through: db.PostsCat });

// Export de ma db
module.exports = db;
