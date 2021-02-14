const express = require("express");
let cars = require("./cars");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();

app.use(bodyParser.json());

// FULL YARD
app.get("/cars", (req, res) => res.json(cars));

// SINGLE CAR DETAIL BY ID
app.get("/cars/:carId", (req, res) => {
  const foundCar = cars.find((car) => car.id === +req.params.carId);
  if (foundCar) {
    res.json(foundCar);
  } else {
    res.status(404);
    res.json({ message: "Entry not found" });
  }
}),
  // DELETE CAR BY ID
  app.delete("/cars/:carId", (req, res) => {
    const foundCar = cars.find((car) => car.id === +req.params.carId);
    if (foundCar) {
      cars = cars.filter((car) => car.id !== +req.params.carId);
      res.status(204).end();
    } else {
      res.status(404);
      res.json({ message: "Entry not found" });
    }
  });
// ADD CAR
app.post("/cars", (req, res) => {
  const id = cars[cars.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCar = { id, slug, ...req.body };
  cars.push(newCar);
  res.status(201).json(newCar);
});

app.listen(8000, () =>
  console.log("why are you running, WHY ARE YOU RUNNING on localhost:8000 ? ")
);
