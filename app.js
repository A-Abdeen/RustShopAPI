const express = require("express");
const db = require("./db/models");
const bodyParser = require("body-parser"); // Why do I need this?
const slugify = require("slugify"); // Where is this being used?
const extraRoutes = require("./routes/extra");
const carRoutes = require("./routes/cars");
const manufacturerRoutes = require("./routes/manufacturers");

const path = require("path");
const app = express();

// Middleware---------------------------------
app.use(bodyParser.json());
app.use(extraRoutes);
app.use("/cars", carRoutes);
app.use("/manufacturers", manufacturerRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

// NOT FOUND----------------------------------
app.use((req, res, next) => {
  next({ status: 404, message: "Road not found" });
});

// ERROR--------------------------------------
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Beignner Coder Caused Server Error",
  });
});

// DATABASE SYNC------------------------------
db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

app.listen(8000, () =>
  console.log("why are you running, WHY ARE YOU RUNNING on localhost:8000 ? ")
);
