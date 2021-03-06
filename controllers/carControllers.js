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
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Manufacturer,
        as: "manufacturer",
        attributes: { exclude: ["createdAt", "updatedAt"] },
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
    if (req.user.id === req.bakery.userId) {
      await req.car.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

// UPDATE CAR BY ID---------------------------
exports.carUpdate = async (req, res, next) => {
  try {
    if (req.user.id === req.bakery.userId) {
      if (req.file);
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      {
        await req.car.update(req.body);
        res.status(200).json(req.car);
      }
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
