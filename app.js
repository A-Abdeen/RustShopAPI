const express = require("express");
const db = require("./db/models");
const bodyParser = require("body-parser"); // Why do I need this?
const slugify = require("slugify"); // Where is this being used?
const extraRoutes = require("./routes/extra");
const taskRoutes = require("./routes/cars");

const app = express();

// Middleware---------------------------------
app.use(bodyParser.json());
app.use(extraRoutes);
app.use("/cars", taskRoutes);

db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

app.listen(8000, () =>
  console.log("why are you running, WHY ARE YOU RUNNING on localhost:8000 ? ")
);
