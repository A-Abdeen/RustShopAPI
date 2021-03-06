const express = require("express");
const db = require("./db/models");
const bodyParser = require("body-parser"); // Why do I need this? §§§§§§§§§§§
const passport = require("passport");
const carRoutes = require("./routes/cars");
const manufacturerRoutes = require("./routes/manufacturers");
const userRoutes = require("./routes/users");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const app = express();
const path = require("path");
const cors = require("cors");

// Middleware---------------------------------
app.use(bodyParser.json()); // IS THIS CORRECT? §§§§§§§§§§§§§§
app.use(cors());
// ----- Passport Middlewares
app.use(passport.initialize());
passport.use(localStrategy); // To use this strategy within the functions of the passport middleware
passport.use(jwtStrategy); //

// ROUTES-------------------------------------
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
