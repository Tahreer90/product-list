const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const email = require("mongoose-type-email");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: mongoose.SchemaTypes.Email,
  },

  firstName: String,
  lastName: String,
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
});
module.exports = model("User", userSchema);
