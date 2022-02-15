const express = require("express");
const router = express.Router();
const upload = require("../../middleware/multer");
const passport = require("passport");
const {
  listShopsController,
  createShopController,
  createDataController,
} = require("./controllers");

router.get("/api/shops", listShopsController);
router.post(
  "/api/shops",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  createShopController
);
router.post(
  "/api/shops/:shopId/products",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  createDataController
);

module.exports = router;
