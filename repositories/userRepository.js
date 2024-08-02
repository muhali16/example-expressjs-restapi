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

module.exports = {all, create, findByUsername, findById};