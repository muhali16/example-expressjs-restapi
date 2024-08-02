const userRepository = require("../repositories/userRepository");
const jsonResponse = require("../utils/jsonResponse");
const authService = require("../services/authService");

const register = async (req, res) => {
  const user = await userRepository.create(req.body);
  res.status(201).json(jsonResponse(201, user));
}

const signing = async (req, res) => {
  const {username = '', password = ''} = req.body;
  const authAttempt = await authService.attempt(username, password);
  if (authAttempt) {
    res.status(202).json(jsonResponse(202, authAttempt));
  } else {
    res.status(400).json(jsonResponse(400, null, {name: "AuthError", message: "Incorrect username or password."}));
  }
}

const signout = async (req, res) => {
  const {username} = req.body;
  const forgetToken = await authService.forgetToken(username);
  if (forgetToken.deletedCount < 1) {
    res.status(400).json(jsonResponse(400, null, "User token not found."));
  }
  res.status(204).json(jsonResponse(204, forgetToken));
}

module.exports = {register, signing, signout}