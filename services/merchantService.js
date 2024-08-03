const userRepository = require("../repositories/userRepository");
const merchantRepository = require("../repositories/merchantRepository");

const createMerchant = async (merchant) => {
  const {name, address, user} = merchant;
  const merchantData = await merchantRepository.findByUserId(user);
  if (merchantData) {
    return false;
  }
  const createMerchant = await merchantRepository.create({name, address, user});
  if (!createMerchant) {
    return false;
  }
  return createMerchant;
}

module.exports = {createMerchant}