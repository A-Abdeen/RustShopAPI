const { Car } = require("../db/models");

// FETCH--------------------------------------
exports.fetchCar = async (carId, next) => {
  try {
    const foundCar = await Car.findByPk(carId);
    return foundCar;
  } catch (err) {
    next(err);
  }
};

// FULL YARD----------------------------------
exports.fullYard = async (req, res, next) => {
  try {
    const cars = await Car.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(cars);
  } catch (err) {
    next(err);
  }
};

// SINGLE CAR DETAIL BY ID--------------------  WHY NOT SHOWING MESSAGE?
exports.carDetail = async (req, res, next) => {
  res.json(req.car);
};
// DELETE CAR BY ID---------------------------
exports.carDelete = async (req, res, next) => {
  try {
    await req.car.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// UPDATE CAR BY ID---------------------------
exports.carUpdate = async (req, res, next) => {
  try {
    await req.car.update(req.body);
    res.status(200).json(req.car);
  } catch (err) {
    next(err);
  }
};

// ADD CAR------------------------------------
exports.carAdd = async (req, res, next) => {
  try {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    next(err);
  }
};
