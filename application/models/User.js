const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  img_url: {
    type: String
  },
  blurb: {
    type: String,
    required: false
  },
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

UserSchema.index({
  name: 'text',
  username: "text",
  email: "text"
});

module.exports = User = mongoose.model("users", UserSchema);