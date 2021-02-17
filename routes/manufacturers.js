const express = require("express");
const {
  fullList,
  manufacturerDetail,
  manufacturerDelete,
  manufacturerUpdate,
  manufacturerAdd,
  fetchManufacturer,
  carAdd,
} = require("../controllers/manufacturerControllers");

const router = express.Router();
const upload = require("../middleware/multer.js");

// single = single image upload
// image = name of field in model where upload should happen (basically destination)

// ROUTE PARAM FOR DETAIL/DELETE/UPDATE
router.param("manufacturerId", async (req, res, next, manufacturerId) => {
  const foundManufacturer = await fetchManufacturer(manufacturerId, next);
  if (foundManufacturer) {
    req.manufacturer = foundManufacturer;
    next();
  } else {
    next({
      status: 404,
      message: "Entry not found",
    });
  }
});

// FULL LIST----------------------------------
router.get("/", fullList);

// SINGLE MANUFACTURER DETAIL BY ID--------------------
router.get("/:manufacturerId", manufacturerDetail);

// DELETE MANUFACTURER BY ID---------------------------
router.delete("/:manufacturerId", manufacturerDelete);

// UPDATE MANUFACTURER BY ID---------------------------
router.put("/:manufacturerId", upload.single("image"), manufacturerUpdate);

// ADD MANUFACTURER------------------------------------
router.post("/", upload.single("image"), manufacturerAdd);

// ADD CAR------------------------------------
router.post("/:manufacturerId/cars", upload.single("image"), carAdd);

module.exports = router;
