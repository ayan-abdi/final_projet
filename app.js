const express = require("express");

// loading des var env
require("dotenv-flow").config();

//  Variable d'env
const { PORT, NODE_ENV } = process.env;

// Creer mon app
const app = express();

// Add routing

// Start wep api
app.listen(PORT, () => {
  console.log(`Bienvenu sur mon web api sur ${PORT} [*{NODE_ENV}]`);
});
