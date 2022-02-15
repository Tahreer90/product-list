const express = require("express");
const { signup, signin } = require("./controllers");
const router = express.Router();
const passport = require("passport");

router.post("/api/signup", signup);
router.post(
  "/api/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
