const express = require("express");
let cars = require("./cars");
const bodyParser = require("body-parser");
const slugify = require("slugify");
const db = require("./db/models");

const app = express();
const { Car } = require("./db/models");
app.use(bodyParser.json());

// FULL YARD
app.get("/cars", async (req, res) => {
  try {
    const cars = await Car.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
  app.delete("/cars/:carId", async (req, res) => {
    try {
      const foundCar = await Car.findByPk(req.params.carId);
      if (foundCar) {
        await foundCar.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Entry not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// ADD CAR
app.post("/cars", async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//   const id = cars[cars.length - 1].id + 1;
//   const slug = slugify(req.body.name, { lower: true });
//   const newCar = { id, slug, ...req.body };
//   cars.push(newCar);
//   res.status(201).json(newCar);
// });
db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

// const run = async () => {
//   try {
//     await db.authenticate();
//     console.log("Connection to the database successful!");
//   } catch (error) {
//     console.error("Error connecting to the database: ", error);
//   }

//   await app.listen(8000, () => {
//     console.log("why are you running, WHY ARE YOU RUNNING on localhost:8000 ? ");
//   });
// };

// run();

app.listen(8000, () =>
  console.log("why are you running, WHY ARE YOU RUNNING on localhost:8000 ? ")
);
