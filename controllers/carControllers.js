const { Car } = require("../db/models");

// FULL YARD---------------------------------
exports.fullYard = async (req, res) => {
  try {
    const cars = await Car.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SINGLE CAR DETAIL BY ID------------------
exports.carDetail = async (req, res) => {
  const { carId } = req.params;
  const foundCar = await Car.findByPk(carId);
  if (foundCar) {
    res.json(foundCar);
  } else {
    res.status(404);
    res.json({ message: "Entry not found" });
  }
};
// DELETE CAR BY ID-----------------------
exports.carDelete = async (req, res) => {
  try {
    const { carId } = req.params;
    const foundCar = await Car.findByPk(carId);
    if (foundCar) {
      await foundCar.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Entry not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CAR BY ID--------------------------
exports.carUpdate = async (req, res) => {
  try {
    const { carId } = req.params;
    const foundCar = await Car.findByPk(carId);
    if (foundCar) {
      await foundCar.update(req.body);
      res.status(200).json(foundCar);
    } else {
      res.status(404).json({ message: "Entry not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD CAR------------------------------------
exports.carAdd = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
