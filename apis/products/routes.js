const express = require("express");
let products = require("../../products");
const {
  fetchDataController,
  createDataController,
  deleteDataController,
  updateDataController,
  fetchProduct,
} = require("./controllers");

const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  req.product = product;
  next();
});

router.get("/api/products", fetchDataController);
router.post("/api/products", createDataController);
router.delete("/api/products/:productId", deleteDataController);
router.put("/api/products/:productId", updateDataController);

module.exports = router;
