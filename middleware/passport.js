const LocalStrategy = require("passport-local").Strategy; // Bring a class
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt"); // to hash entered password before validate
const { User } = require("../db/models");
const { JWT_SECRET } = require("../config/keys");

// User instance of the class local strategy, automatically taking username and password as arguments from req.body
// third argument is 'done' (passport function) that attach credintials to req
exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    // Look for user in User model that matches req username via the findOne function (sequelize method)
    const user = await User.findOne({
      // define username as username to search for the first argument in the field with the same name in the backend
      where: { username },
    });
    // passwordsMatch checks: if user exists, moves to compare password, else it returns false
    // hash password then use the 'bcrypt.compare' function comparing existing hashed password
    // if password matched it returns true, if not, it returns false again
    let passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    // if passwordsMatch return true, it becomes done(null, user), else done(null,false)
    // Using 'done(null,false)' automatically throws a 401 (unauthorized) error
    // Once validated, the done saves it into req.user and allows it to pass through the sign in route to the sign in controller
    return done(null, passwordsMatch ? user : false);
  } catch (err) {
    // if you want to catch an error and you have an error object, it can be given to done to deal with it
    return done(err);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    } else {
      try {
        const user = await User.findByPk(jwtPayload.id);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  }
);
