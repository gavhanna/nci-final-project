const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ShoppingListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  list: [{
    item: {
      type: String,
      required: true
    },
    pickedUp: {
      type: Boolean,
      default: false
    }
  }]
});

module.exports = ShoppingList = mongoose.model("shoppinglists", ShoppingListSchema);