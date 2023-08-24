const express = require('express');
const router = express.Router();
const cors = require('cors');
const userModel = require('../models/user.model');
const recipeModel = require('../models/recipe.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.use(express.json());
router.use(cors());

const jwtSecret = process.env.JWT_SECRET;

//remove recipe from users list of favorited recipes
router.delete('/remove_favorite/:id', async (req, res) => {
  console.log('deleting');
  const token = req.headers['x-access-token'];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.email;
    const user = await userModel.updateOne(
      { email: email },
      { $pull: { recipes: req.params.id } }
    );
    res.json({ status: 'ok', message: 'recipe removed' });
  } catch (error) {
    if (!user) {
      res.json({ status: 'error', message: 'no user found', error: error });
    } else {
      res.json({
        status: 'error',
        message: 'Could not remove recipe',
        error: error,
      });
    }
  }
});

//delete recipe from user's history list
router.delete('/remove_history/:id', async (req, res) => {
  console.log('deleting');
  const token = req.headers['x-access-token'];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.email;
    const user = await userModel.updateOne(
      { email: email },
      { $pull: { history: req.params.id } }
    );
    res.json({ status: 'ok', message: 'recipe removed' });
  } catch (error) {
    if (!user) {
      res.json({ status: 'error', message: 'no user found', error: error });
    } else {
      res.json({
        status: 'error',
        message: 'Could not remove recipe',
        error: error,
      });
    }
  }
});

//validate user with jwt token
router.get('/validate_user', async (req, res) => {
  console.log('working');
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.email;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.json({
        status: 'error',
        authenticated: false,
        error: 'User not found',
      });
      return;
    }
    res.json({
      status: 'ok',
      authenticated: true,
      user: {
        name: user.name,
        recipes: user.recipes,
        history: user.history,
        userId: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', authenticated: false, error: error.message });
  }
});

//find all recipes in user's saved recipes
router.post('/user_recipes', async (req, res) => {
  try {
    const recipeIds = req.body.recipes;
    const recipes = await recipeModel.find({ _id: { $in: recipeIds } });
    res.json({ status: 'ok', recipes: recipes });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: error.message });
  }
});

//login user, ENCRYPT PASSWORD AND GET JWT
router.post('/login', async (req, res) => {
  const user = await userModel.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.json({ status: 'error', user: false });
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        email: user.email,
      },
      jwtSecret
    );
    return res.json({ status: 'ok', user: token });
  } else {
    return res.json({ status: 'error', user: false });
  }
});

//register new user, NEED TO ENCRYPT PASSWORD
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      recipes: [],
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: err });
  }
});

//add recipe to user's favorited list
router.post('/favorite_recipe', async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.email;
    const user = await userModel.updateOne(
      { email: email },
      //figure out how to add recipes to start of array, not end!
      { $push: { recipes: { $each: [req.body.recipeId], $position: 0 } } }
    );
    res.json({ status: 'ok', message: 'recipe added to favorites' });
  } catch (error) {
    res.json({ status: 'error', error: 'invalid token' });
  }
});

// add recipe to user's history
router.post('/add_history', async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const email = decoded.email;
    const user = await userModel.updateOne(
      { email: email },
      { $push: { history: { $each: [req.body.recipeId], $position: 0 } } }
    );
    res.json({ status: 'ok', message: 'recipe added to history' });
  } catch (error) {
    res.json({ status: 'error', error: 'invalid token' });
  }
});

module.exports = router;
