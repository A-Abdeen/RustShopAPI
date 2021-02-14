const express = require("express");
const cars = require("./cars");

const app = express();

app.get("/cars", (req, res) => {
  res.json(cars);
});

app.listen(8000, () =>
  console.log("why are you running, WHY ARE YOU RUNNING, localhost:8000 ?")
);
