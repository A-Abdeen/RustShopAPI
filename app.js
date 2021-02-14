const express = require("express");
let cars = require("./cars");

const app = express();

app.get("/cars", (req, res) => res.json(cars));

app.get("/cars/:carId", (req, res) => {
  const foundCar = cars.find((car) => car.id === +req.params.carId);
  if (foundCar) {
    res.json(foundCar);
  } else {
    res.status(404);
    res.json({ message: "Entry not found" });
  }
}),
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
app.listen(8000, () =>
  console.log("why are you running, WHY ARE YOU RUNNING on localhost:8000 ? ")
);
