const { Manufacturer, Car } = require("../db/models");

// FETCH--------------------------------------
exports.fetchManufacturer = async (manufacturerId, next) => {
  try {
    const foundManufacturer = await Manufacturer.findByPk(manufacturerId);
    return foundManufacturer;
  } catch (err) {
    next(err);
  }
};

// FULL LIST----------------------------------
exports.fullList = async (req, res, next) => {
  try {
    const manufacturers = await Manufacturer.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Car,
          as: "car",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(manufacturers);
  } catch (err) {
    next(err);
  }
};

// SINGLE MANUFACTURER DETAIL BY ID--------------------  IS IT NORMAL TO SHOW MESSAGE IN CONSOLE?
exports.manufacturerDetail = async (req, res, next) => {
  res.json(req.manufacturer);
};
// DELETE MANUFACTURER BY ID---------------------------
exports.manufacturerDelete = async (req, res, next) => {
  try {
    await req.manufacturer.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// UPDATE MANUFACTURER BY ID---------------------------
exports.manufacturerUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      await req.manufacturer.update(req.body);
      res.status(200).json(req.manufacturer);
    }
  } catch (err) {
    next(err);
  }
};

// ADD MANUFACTURER------------------------------------
exports.manufacturerAdd = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newManufacturer = await Manufacturer.create(req.body);
    res.status(201).json(newManufacturer);
  } catch (err) {
    next(err);
  }
};

// ADD CAR------------------------------------
exports.carAdd = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.manufacturerId = req.manufacturer.id;
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    next(err);
  }
};
