const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

const URI = process.env.URI;

mongoose.connect(URI);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const recipeRouter = require('./routes/recipe');
app.use('/recipe', recipeRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on ${PORT}`);
});
