const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load input validation
const ValidateShoppingListInput = require("../../validation/shoppinglist")

// Load input validation
const validateShoppingListInput = require("../../validation/shoppinglist")

// Load user model
const User = require("../../models/User");
const Recipe = require("../../models/Recipe");
const ShoppingList = require("../../models/ShoppingList");

// route   GET api/shoppinglist/test
// desc    Test shoppinglist route
// access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "working" })
})

// route   GET api/shopplinglist/:user
// desc    Get user's shoppinglist
// access  Private
router.get("/:user_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  ShoppingList.findOne({ user: req.params.user_id })
    .then(shoppinglist => {
      res.json(shoppinglist);
    }).catch(err => res.status(400).json(err))
})



// route   POST api/shopplinglist/create
// desc    Create a recipe book
// access  Public
router.post("/create", (req, res) => {
  ShoppingList.findOne({ user_id: req.body.user_id })
    .then(shoppinglist => {
      if (!shoppinglist) {
        const newShoppingList = new ShoppingList({
          user: req.body.user_id,
          list: []
        });
        newShoppingList.save()
          .then(shoppinglist => res.json(shoppinglist))
          .catch(err => res.status(500).json({ error: "Something went wrong" }))
      } else {
        res.json({ msg: "Shoppinglist already exists" })
      }
    }).catch(err => res.json({ msg: "No shoppinglist found in database" }))
});

// route   POST api/shopplinglist/add
// desc    Add item to shopping list
// access  Private
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateShoppingListInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  ShoppingList.findOne({ user: req.user.id })
    .then(shoppinglist => {

      shoppinglist.list.push({ item: req.body.item });
      shoppinglist.save()
        .then(shoppinglist => {
          res.json(shoppinglist)
        }).catch(err => res.json({ msg: "error on saving" }));
    }).catch(err => res.json({ msg: err }))

});

// route   POST api/shopplinglist/pickedUp
// desc    Change item to pickedUp = true
// access  Private
router.post("/pickedUp", passport.authenticate("jwt", { session: false }), (req, res) => {

  ShoppingList.findOne({ user: req.user.id })
    .then(shoppinglist => {
      shoppinglist.list.forEach(item => {
        if (item && item._id == req.body.item_id) {
          item.pickedUp = true;
        }
      })
      shoppinglist.save()
        .then(shoppinglist => {
          res.json(shoppinglist)

        })
    }).catch(err => res.json({ msg: err }))
});

// route   POST api/shopplinglist/pickedUp
// desc    Change item to pickedUp = false
// access  Private
router.post("/putBack", passport.authenticate("jwt", { session: false }), (req, res) => {

  ShoppingList.findOne({ user: req.user.id })
    .then(shoppinglist => {
      shoppinglist.list.forEach(item => {
        if (item && item._id == req.body.item_id) {
          item.pickedUp = false;
        }
      })
      shoppinglist.save()
        .then(shoppinglist => {
          res.json(shoppinglist)

        })
    }).catch(err => res.json({ msg: err }))
});

// route   DELETE api/shopplinglist/delete/:item_id
// desc    Delete item from shopping list
// access  Private
router.delete("/delete/:item_id", passport.authenticate("jwt", { session: false }), (req, res) => {

  ShoppingList.findOne({ user: req.user.id })
    .then(shoppinglist => {
      const newList = shoppinglist.list.filter(item => {
        return item._id != req.params.item_id
      })
      console.log(newList);
      shoppinglist.list = newList;
      shoppinglist.save()
        .then(shoppinglist => {
          res.json(shoppinglist)

        })
    }).catch(err => res.json({ msg: err }))
});

// route   POST api/shopplinglist/clear
// desc    Clear entire shopping list
// access  Private
router.post("/clear", passport.authenticate("jwt", { session: false }), (req, res) => {

  ShoppingList.findOne({ user: req.user.id })
    .then(shoppinglist => {
      shoppinglist.list = [];
      shoppinglist.save()
        .then(shoppinglist => {
          res.json(shoppinglist)

        })
    }).catch(err => res.json({ msg: err }))
});







module.exports = router;
