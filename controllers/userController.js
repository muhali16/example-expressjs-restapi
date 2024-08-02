const userRepository = require("../repositories/userRepository");
const jsonResponse = require('../utils/jsonResponse');

const index = async (req, res) => {
  const users = await userRepository.all();
  res.status(200).json(jsonResponse(200, users));
}

const show = async (req, res) => {
  const {username} = req.params;
  const user = await userRepository.findByUsername(username);
  res.status(200).json(jsonResponse(200, user));
}

module.exports = { index, show };