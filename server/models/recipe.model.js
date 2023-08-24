const mongoose = require("mongoose");

const Recipe = new mongoose.Schema(
  {
    recipeName: { type: String, required: true },
    ingredients: { type: Array, required: true },
    instructions: { type: Array, required: true },
    rating: { type: Number, required: true },
    tags: { type: Array, required: true },
    creatorId: { type: String, required: true },
  },
  { collection: "recipes" }
);

const recipeModel = mongoose.model("recipes", Recipe);

module.exports = recipeModel;
