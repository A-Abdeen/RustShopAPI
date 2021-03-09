const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

//============================== SIGN UP ==========================//

exports.signup = async (req, res, next) => {
  try {
    // Number of hashing rounds to go into the hashing function
    const saltRounds = 10;
    // Variable to hold a hashed version of the request's password which is created via the bcrypt hashing function
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    // Reassign the (now hashed) password back to the request before signup takes place
    req.body.password = hashedPassword;
    // Now a request can be securely registered in the User model via the create function
    const newUser = await User.create(req.body);
    // To send a token to frontend upon signing up to automatically sign in (payload must match sign in payload)
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS, /// in milli-seconds
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

//============================== SIGN IN ==========================//
// receives req.user from the passport after being validated via authentication in route
// signing gives the user a proof of being signed in (JasonWebToken/JWT)
// JWT standard for creating data with optional signiture
// JWT encryptes user data in the backend, then share it with frontend where its decrypted again
// www.jwt.io ---> When given payload object, returns token, and vice versa
exports.signin = async (req, res, next) => {
  const { user } = req;
  // decide what to include in payload object to send to frontend (anything)
  // Good practice is to include useful attributes that frontend would consistently need to avoid sending sending multiple requests (e.g. user type; buyer or seller?)
  const payload = {
    id: user.id,
    username: user.username,
    // Token expires in the specified number of milli-seconds from time of sign in
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  // use the sign function to send the payload object (after converting it to string form) and the super secret key
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  // send the jwt token as a sign in response
  res.json({ token });
};
