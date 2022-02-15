// let products = require("../../products");
const Products = require("../../models/Product");

exports.fetchProduct = async (productId, next) => {
  try {
    const productFound = await Products.findById(productId);
    if (productFound) {
      return productFound;
    } else {
      const err = new Error("Product Not Found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.fetchDataController = async (req, res, next) => {
  try {
    const products = await Products.find().populate("shop");
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// exports.createDataController = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//     const newProduct = await Products.create(req.body);
//     res
//       .status(201)
//       .json({ msg: "new product is created", payload: newProduct });
//   } catch (error) {
//     next(error);
//   }

//   const id = products[products.length - 1].id + 1;
//   const { name, image, description, color, quantity, price } = req.body;
//   const newProduct = {
//     name,
//     image,
//     description,
//     color,
//     quantity,
//     price,
//     id,
//     ...req.body,
//   };
//   products.push(newProduct);
//   res.status(201).json({ msg: "new product is created", newProduct });

exports.deleteDataController = async (req, res, next) => {
  try {
    const productId = req.product._id;
    const foundProduct = await Products.findByIdAndDelete(productId);
    res.status(204).end();

    // if (foundProduct) {
    //   res.status(204).end();
    // } else {
    //   const err = new Error("Product Not Found");
    //   err.status = 404;
    //   next(err);
    // }
  } catch (error) {
    next(error);
  }

  //   const { productId } = req.params;
  //   const foundProduct = products.find((product) => product.id === +productId);
  //   if (foundProduct) {
  //     products = products.filter((product) => product.id !== +productId);
  //     res.status(204).end();
  //   } else {
  //     res.status(404);
  //     res.json({ message: "Product not found" });
  //   }
};

exports.updateDataController = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const productId = req.product._id;
    const foundProduct = await Products.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "Product updated", foundProduct });

    // if (foundProduct) {
    //   res.status(200).json({ msg: "Product updated", foundProduct });
    // } else {
    //   const err = new Error("Product Not Found");
    //   err.status = 404;
    //   next(err);
    // }
  } catch (error) {
    next(error);
  }
};
