const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load input validation
const validateRecipeInput = require("../../validation/recipe")

// Load user model
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

// route   GET api/recipes/test
// desc    Test recipes route
// access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "working" })
})

// route   POST api/recipes/create
// desc    Create new recipe
// access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateRecipeInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newRecipe = new Recipe({
    user_id: req.user.id,
    title: req.body.title,
    desc: req.body.desc,
    dietary: req.body.dietary,
    meal: req.body.meal,
    img_url: req.body.img_url,
    cooktime: parseInt(req.body.cooktime),
    preptime: parseInt(req.body.preptime)
  })
  newRecipe.ingredients.push(req.body.ingredients);
  newRecipe.method.push(req.body.method);

  newRecipe.save()
    .then(recipe => {
      res.json(recipe);
    }).catch(err => res.json(err));
});

// route   POST api/recipes/edit
// desc    Edit existing recipe
// access  Private
router.post("/edit", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateRecipeInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Recipe.findById(req.body.recipe_id)
    .then(recipe => {
      recipe.title = req.body.title;
      recipe.desc = req.body.desc;
      recipe.dietary = req.body.dietary;
      recipe.meal = req.body.meal;
      recipe.img_url = req.body.img_url;
      recipe.cooktime = parseInt(req.body.cooktime);
      recipe.preptime = parseInt(req.body.preptime);
      recipe.ingredients = [req.body.ingredients];
      recipe.method = [req.body.method];

      recipe.save()
        .then(recipe => {
          res.json(recipe);
        }).catch(err => res.json(err));
    })
    .catch(err => res.status(404).json({ error: "Recipe not found" }))
});

// route   POST api/recipes/delete
// desc    Delete a recipe by id
// access  Private
router.post("/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
  Recipe.deleteOne({ _id: req.body.recipe_id })
    .then(data => res.json({ msg: "Recipe successfully deleted" }))
    .catch(err => res.json(err))
});

// route   POST api/recipes/like
// desc    Like/unlike a recipe
// access  Private
router.post("/like", passport.authenticate("jwt", { session: false }), (req, res) => {
  Recipe.findById(req.body.recipe_id)
    .then(recipe => {
      if (recipe.likes.indexOf(req.user.id) > -1) {
        recipe.likes.pull(req.user.id);
      } else {
        recipe.likes.push(req.user.id);
      }
      recipe.save()
        .then(recipe => {
          res.json(recipe)
        })
        .catch(err => res.status(400).json(err))
    })
});

// route   GET api/recipes/:user_id
// desc    Get specific user recipes, sorted by most recent
// access  Public
router.get("/:user_id", (req, res) => {
  console.log(req.params.user_id);
  Recipe.find({ user_id: req.params.user_id })
    .sort([["created_at", -1]])
    .populate({ path: "likes", select: "username" })
    //.populate("comments")
    .then(recipes => {
      res.json(recipes);
    })
    .catch(err => res.status(404).json({ msg: "No recipes found" }))
});




module.exports = router;