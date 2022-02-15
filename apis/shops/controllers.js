const Shop = require("../../models/Shop");
const Product = require("../../models/Product");

exports.fetchShops = async (shopId, next) => {
  try {
    const shopFound = await Shop.findById(shopId);
    if (shopFound) {
      return shopFound;
    } else {
      const err = new Error("Shop Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.listShopsController = async (req, res, next) => {
  try {
    const shops = await Shop.find().populate("products");
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.createShopController = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    req.body.owner = req.user._id;
    const newShop = await Shop.create(req.body);
    res.status(201).json({ msg: "new shop is created", payload: newShop });
  } catch (error) {
    next(error);
  }
};

exports.createDataController = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    console.log(shopId);
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const shop = await Shop.findById(shopId);
    //console.log("here is", shop.owner);
    //console.log("hello Mr.", req.user._id);
    if (shop.owner.toString() === req.user.id.toString()) {
      const newProduct = await Product.create(req.body);
      //console.log(newProduct._id, ":( please work");
      await Shop.findByIdAndUpdate(shopId, {
        $push: { products: newProduct._id },
      });
      res
        .status(201)
        .json({ msg: "new product is created", payload: newProduct });
    } else {
      res.status(401).json({ msg: "You are not the owner" });
    }
  } catch (error) {
    next(error);
  }
};
