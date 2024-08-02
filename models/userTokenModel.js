const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token undefined."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    default: function() {
      return Date.now() + 24 * 60 * 60 * 1000;
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const UserToken = mongoose.model("UserToken", userTokenSchema);
module.exports = UserToken;