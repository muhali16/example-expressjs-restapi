const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const userTokenRepository = require("../repositories/userTokenRepository");

const attempt = async (username, password) => {
  const user = await userRepository.findUserPasswordByUsername(username);
  if (user) {
    const passwordChacked = await bcrypt.compareSync(password, user.password);
    if (passwordChacked) {
      let userToken = await userTokenRepository.findUserTokenByUserId(user);
      if (!userToken || userToken.expiredAt <= Date.now()) {
        await userTokenRepository.deleteUserTokenById(userToken._id);
        userToken = await userTokenRepository.createToken(user);
        return userToken
      }
      return userToken;
    }
  }
  return null;
}

const tokenCheck = async (token) => {
  const authToken = token.split(' ');
  const userToken = await userTokenRepository.findByUserToken(authToken[1] ?? 'ojrvmirevermg');
  if (!userToken || userToken.expiredAt <= Date.now()) {
    return false;
  }
  return true;
}

const forgetToken = async (username) => {
  const user = await userRepository.findByUsernameOrId(username);
  return await userTokenRepository.deleteUserTokenByUserId(user._id);
}

module.exports = {attempt, tokenCheck, forgetToken}