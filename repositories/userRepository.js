const User = require('../models/userModel');

const all = () => {
  return User.find();
}

const create = async (data) => {
  const {username, password} = data;
  const user = new User({username, password});
  await user.save();
  return user;
}

const findByUsername = async (username) => {
  const userData = await User.findOne({username: username});
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
  const user = await findById(userId);
  const {username = user.username, balance = user.balance} = data;
  const updateUser = await User.findOneAndUpdate(
      {_id: userId},
      {$set: {username: username, balance: balance}},
      {new: true, select: 'username balance'}
  );
  return updateUser;
}

module.exports = {all, create, findByUsername, findById, updateUserById};