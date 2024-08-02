const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose
const randomStringGenerator = require('../utils/randomStringGenerator');

const merchantSchema = new mongoose.Schema({
  uid: {
    type: String,
    maxLength: 255,
    // default: function() {
    //   randomStringGenerator(30).then((res) => {
    //     console.log(res);
    //     return res;
    //   }).catch((err) => {
    //     console.error(err);
    //   });
    // },
    required: [true, "UID is required."]
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
// merchantSchema.pre("save", async function(next) {
//   // if uid not modified
//   if (!this.isModified('uid')) {
//     return next();
//   }
//   try {
//     const uid = await randomStringGenerator(75);
//     console.log(uid);
//     this.uid = uid;
//     next();
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// })

// creating merchant uid before validation
merchantSchema.pre("validate", async function (next) {
  if (!this.uid) {
    try {
      this.uid = await randomStringGenerator(75);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Merchant = mongoose.model('Merchant', merchantSchema);
module.exports = Merchant;