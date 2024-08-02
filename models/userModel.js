const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username is unique'],
    minLength: [5, "Username must be more than 5 characters long"],
    maxLength: [100, "Username must be less than 100 characters long"],
    match: [/^[a-zA-Z0-9]+$/, 'Username must not contain any symbol'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [5, "Password must be more than 5 characters long"],
    maxLength: [255, "Password must be less than 255 characters long"],
  },
  balance: {
    type: Long,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model("User", userSchema);
module.exports = User;