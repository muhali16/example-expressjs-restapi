const userRepository = require("../repositories/userRepository");
const jsonResponse = require('../utils/jsonResponse');

const index = async (req, res) => {
  const users = await userRepository.all();
  res.status(200).json(jsonResponse(200, users ?? "No users found."));
}

const show = async (req, res) => {
  const {username} = req.params;
  const user = await userRepository.findByUsername(username);
  res.status(200).json(jsonResponse(200, user ?? "User not found."));
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

module.exports = { index, show, changeUsername };