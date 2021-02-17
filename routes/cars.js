const express = require("express");
const {
  fullYard,
  carDetail,
  carDelete,
  carUpdate,
  fetchCar,
} = require("../controllers/carControllers");

const router = express.Router();
const upload = require("../middleware/multer.js");

// single = single image upload
// image = name of field in model where upload should happen (basically destination)

// ROUTE PARAM FOR DETAIL/DELETE/UPDATE
router.param("carId", async (req, res, next, carId) => {
  const foundCar = await fetchCar(carId, next);
  if (foundCar) {
    req.car = foundCar;
    next();
  } else {
    next({
      status: 404,
      message: "Entry not found",
    });
  }
});

// FULL YARD----------------------------------
router.get("/", fullYard);

// SINGLE CAR DETAIL BY ID--------------------
router.get("/:carId", carDetail);

// DELETE CAR BY ID---------------------------
router.delete("/:carId", carDelete);

// UPDATE CAR BY ID---------------------------
router.put("/:carId", upload.single("image"), carUpdate);

module.exports = router;
