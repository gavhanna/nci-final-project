const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    requried: true
  },
  blurb: {
    type: String,
    requried: false
  },
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
});

module.exports = User = mongoose.model("users", UserSchema);