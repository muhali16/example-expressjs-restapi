const UserToken = require("../models/userTokenModel");
const randomStringGenerator = require("../utils/randomStringGenerator");

const findUserTokenByUserId = async (user) => {
  const userToken = await UserToken.findOne({user: user._id});
  if (!userToken) {
    return false;
  }
  return userToken
}

const createToken = async (user) => {
  const randomString = await randomStringGenerator(150);
  const token = new UserToken({
    token: randomString,
    user: user._id
  })
  await token.save();
  return token.populate('user');
}

const findByUserToken = async (token) => {
  let userToken;
  userToken = await UserToken.findOne({ token });
  return userToken;
}

const deleteUserTokenById = async (tokenId) => {
  return await UserToken.deleteOne({_id: tokenId});
}

const deleteUserTokenByUserId = async (userId) => {
  return await UserToken.deleteMany({user: userId});
}

module.exports = { createToken, findUserTokenByUserId, findByUserToken, deleteUserTokenById, deleteUserTokenByUserId };