const bcrypt = require("bcrypt");
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};

exports.signin = (req, res) => {};
