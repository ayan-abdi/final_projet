const express = require("express");
const cors = require("cors");
const pagination = require("./middlewares/pagination");

// Propage les errors
require("express-async-errors");

// loading des files env
require("dotenv-flow").config();

//  Variable d'env
const { PORT, NODE_ENV } = process.env;

// Creer mon app
const app = express();

// Add middlewares
app.use(express.json());
app.use(pagination());
app.use(cors());

// Initialiser DB
const db = require("./models");
db.sequelize
  .authenticate()
  .then(() => console.log("Ma connexion est GOOD"))
  .catch((error) => console.log("Ma connexion est BAD", error));

// Synchroniser model avec DB
if (NODE_ENV === "development") {
  // db.sequelize.sync({ alter: true });
}
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
    return res.status(500).json(error);
  }
  res.sendStatus(500);
});

// Add routing
const router = require("./routes/index-router"); //<= si la route est declaré plus haut cela rend le code badddd
app.use("/api", router);

// Start wep api
app.listen(PORT, () => {
  console.log(`Bienvenu sur mon web api sur ${PORT} [${NODE_ENV}]`);
});
