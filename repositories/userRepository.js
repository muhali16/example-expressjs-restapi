const User = require('../models/userModel');
const Merchant = require('../models/merchantModel');
const mongoose = require("mongoose");

const all = () => {
  return User.find();
}

const create = async (data) => {
  const {username, password} = data;
  const user = new User({username, password});
  await user.save();
  return user;
}

const findByUsernameOrId = async (user) => {
  const userData = await User.findOne({
    $or: [
        {_id: mongoose.Types.ObjectId.isValid(user) ? user : null},
        {username: user}
    ]
  });
  if (!userData) {
    return false;
  }
  return userData;
}

const findUserPasswordByUsername = async (username) => {
  const userData = await User.findOne({username: username}).select('+password');
  if (!userData) {
    return false;
  }
  return userData;
}

const findById = async (id) => {
  const userData = await User.findOne({_id: id});
  if (!userData) {
    return false;
  }
  return userData;
}

const updateUserById = async (userId, data) => {
  const {username, balance} = data;
  const updateUser = await User.findOneAndUpdate(
      {_id: userId},
      {$set: {username: username, balance: balance}},
      {new: true, select: 'username balance'}
  );
  return updateUser;
}

const deleteUserById = async (userId) => {
  const userDelete = await User.deleteOne({_id: userId});
  const merchantDelete = await Merchant.deleteOne({user: userId});
  return userDelete;
}

module.exports = {all, create, findByUsernameOrId, findById, updateUserById, deleteUserById, findUserPasswordByUsername};