const express = require("express");

const {
  fullYard,
  carDetail,
  carDelete,
  carUpdate,
  carAdd,
} = require("../controllers/carControllers");

const router = express.Router();

// FULL YARD----------------------------------
router.get("/", fullYard);

// SINGLE CAR DETAIL BY ID--------------------
router.get("/:carId", carDetail);

// DELETE CAR BY ID---------------------------
router.delete("/:carId", carDelete);

// UPDATE CAR BY ID---------------------------
router.put("/:carId", carUpdate);

// ADD CAR------------------------------------
router.post("/", carAdd);

module.exports = router;
