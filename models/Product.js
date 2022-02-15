const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    allowNull: false,
  },
  slug: String,
  image: String,
  description: String,
  color: String,
  quantity: {
    type: Number,
    min: 0,
  },
  price: {
    type: Number,
    default: 5,
  },

  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
});

module.exports = model("Product", productSchema);
