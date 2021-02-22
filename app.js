const express = require("express");
const db = require("./db/models");
const bodyParser = require("body-parser"); // Why do I need this?
const slugify = require("slugify"); // Where is this being used?
const bcrypt = require("bcrypt");
const passport = require("passport");
const carRoutes = require("./routes/cars");
const manufacturerRoutes = require("./routes/manufacturers");
const userRoutes = require("./routes/users");
const extraRoutes = require("./routes/extra");
const { localStrategy } = require("./middleware/passport");
const cors = require("cors");

const path = require("path");
const app = express();

// Passport Setup
app.use(passport.initialize());
app.use(passport.initialize());
passport.use(localStrategy);

// Middleware---------------------------------
app.use(bodyParser.json());
app.use(cors());

// ROUTES-------------------------------------
app.use(extraRoutes);
app.use("/cars", carRoutes);
app.use("/manufacturers", manufacturerRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

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
