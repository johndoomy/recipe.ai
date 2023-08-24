const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    recipes: { type: Array, required: true },
    history: { type: Array, required: true },
  },
  { collection: "users" }
);

const userModel = mongoose.model("users", User);

module.exports = userModel;
