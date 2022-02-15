const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (passwordsMatch) return done(null, user);
    return done(null, false);
  } catch (error) {
    done(error);
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
    }
    try {
      const user = await User.findById(jwtPayload.id);
      console.log("passport", user);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
