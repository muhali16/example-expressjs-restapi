const userRepository = require("../repositories/userRepository");
const merchantRepository = require("../repositories/merchantRepository");

const createMerchant = async (userId, merchant) => {
  const {name, address} = merchant;
  const user = await userRepository.findById(userId);
  const merchantData = await merchantRepository.findByUserId(user._id);
  if (merchantData) {
    return merchantData;
  }
  return await merchantRepository.create({name, address, user: user._id});
}

module.exports = {createMerchant}