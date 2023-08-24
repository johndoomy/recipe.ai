const express = require('express');
const router = express.Router();
const cors = require('cors');
const recipeModel = require('../models/recipe.model');
require('dotenv').config();

router.use(express.json());
router.use(cors());

//Connect to chatGPT
const { Configuration, OpenAIApi } = require('openai');
const { param } = require('express/lib/request');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//Propmt to chatGPT including the recipe sent by the GET request
const runCompletion = async (recipe) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Please write a json object for ${recipe} like it was being made by a Michelin starred chef  like this: {recipeName: "", ingredients: [], instructions: []} where the value for recipeName is the name of the recipe without the words Michelin Star, the ingredients value is an array of all of the ingredients as objects with key value pairs for the ingredientName and the ingredientAmount, and the value of instructions is an array with each step of the recipe. Be as specific as possible. Please only respond with json and no other text.`,
      },
    ],
  });
  return completion.data.choices[0].message.content;
};

//get 6 random recipes from recipe table
router.get('/featured', async (req, res) => {
  try {
    const featuredRecipes = await recipeModel.aggregate([
      { $sample: { size: 6 } },
    ]);
    res.json({ status: 'ok', featuredRecipes: featuredRecipes });
  } catch (error) {
    res.json({ status: 'error', error: error });
  }
});

router.get('/refresh_recipe', async (req, res) => {
  try {
    const recipe = await recipeModel.aggregate.sample(1);
    res.json({ status: 'ok', recipe: recipe });
  } catch (error) {
    res.json({ status: 'error', error: error });
  }
});

//send request to chatgpt api
router.post('/generate_recipe', async (req, res) => {
  console.log('cooking');
  try {
    const jsonrecipe = await runCompletion(req.body.params);
    const parsedRecipe = await JSON.parse(jsonrecipe);
    const newRecipe = await recipeModel.create({
      recipeName: parsedRecipe.recipeName,
      ingredients: parsedRecipe.ingredients,
      instructions: parsedRecipe.instructions,
      rating: 0,
      tags: req.body.tags,
      creatorId: req.body.userId,
    });
    res.json({
      status: 'ok',
      message: 'recipe saved to db',
      recipe: newRecipe,
    });
  } catch (error) {
    res.json({ status: 'error', error: error });
  }
});

module.exports = router;
