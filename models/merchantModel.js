const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose
const randomStringGenerator = require('../utils/randomStringGenerator');

const merchantSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: randomStringGenerator(75),
  },
  name: {
    type: String,
    required: [true, 'Merchant name is required'],
    unique: [true, 'Merchant name is unique'],
    minLength: [6, 'Merchant name must be at least 6 characters'],
    maxLength: [255, 'Merchant name must be less than 255 characters'],
    match: [/^[a-zA-Z0-9]+$/, 'Merchant name must not contain any symbol'],
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
  }
});

const Merchant = mongoose.model('Merchant', merchantSchema);
module.exports = Merchant;