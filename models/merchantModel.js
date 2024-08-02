const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose
const randomStringGenerator = require('../utils/randomStringGenerator');

const merchantSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Merchant name is required'],
    unique: [true, 'Merchant name is unique'],
    minLength: [6, 'Merchant name must be at least 6 characters'],
    maxLength: [255, 'Merchant name must be less than 255 characters'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  balance: {
    type: Long,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  lastTransaction: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Merchant must have user id.']
  }
});

// creating merchant uid
merchantSchema.pre("save", async function(next) {
  // if uid not modified
  if (!this.isModified('uid')) {
    return next();
  }
  this.uid = randomStringGenerator(75);
})

const Merchant = mongoose.model('Merchant', merchantSchema);
module.exports = Merchant;