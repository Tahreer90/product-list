const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    exp: Date.now() + keys.JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, keys.JWT_SECRET);

  return token;
};

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(req.body);

    const token = generateToken(newUser);
    //const token = jwt.sign(JSON.stringify(payload), keys.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
