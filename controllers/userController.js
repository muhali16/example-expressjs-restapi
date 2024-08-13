const userRepository = require("../repositories/userRepository");
const jsonResponse = require('../utils/jsonResponse');

const index = async (req, res) => {
  const users = await userRepository.all();
  res.status(200).json(jsonResponse(200, users ?? "No users found."));
}

const show = async (req, res) => {
  const {user} = req.params;
  const userData = await userRepository.findByUsernameOrId(user);
  console.log(userData);
  res.status(200).json(jsonResponse(200, userData ?? "User not found."));
}

const changeUsername = async (req, res) => {
  const { username } = req.body;
  const changeUsername = await userRepository.updateUserById(
    req.params.userId,
      {username},
  );
  if (!changeUsername) {
    res.status(404).json(jsonResponse(404, null, "User not found."));
  }
  res.status(200).json(jsonResponse(200, changeUsername));
};

const deleteAccount = async (req, res) => {
  const deleteUser = await userRepository.deleteUserById(req.params.userId);
  if (!deleteUser) {
    res.status(404).json(jsonResponse(404, null, "User not found."));
  }
  res.status(204).json(jsonResponse(204, null));
}

module.exports = { index, show, changeUsername, deleteAccount };