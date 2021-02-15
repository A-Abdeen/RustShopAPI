const express = require("express");

const router = express.Router();

//  Dummy-------------------------
router.get("/home", (req, res) => res.json({ message: "VROOM VROOM" }));

module.exports = router;
