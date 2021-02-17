const { Car, Manufacturer } = require("../db/models");

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
      attributes: { exclude: ["manufacturerId", "createdAt", "updatedAt"] },
      include: {
        model: Manufacturer,
        as: "manufacturer",
        attributes: ["id"],
      },
    });
    res.json(cars);
  } catch (err) {
    next(err);
  }
};

// SINGLE CAR DETAIL BY ID--------------------  IS IT NORMAL TO SHOW MESSAGE IN CONSOLE?
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
    if (req.file) {
      await req.car.update(req.body);
      res.status(200).json(req.car);
    }
  } catch (err) {
    next(err);
  }
};
