const userRepository = require("../repositories/userRepository");
const merchantRepository = require("../repositories/merchantRepository");

const createMerchant = async (merchant) => {
  const {name, address, user} = merchant;
  const merchantData = await merchantRepository.findByUserId(user);
  if (merchantData) {
    return false;
  }
  return await merchantRepository.create({name, address, user});
}

const deactivateMerchant = async (merchantId) => {
  const merchant = await merchantRepository.updateMerchant(merchantId, {isActive: false});
  if (!merchant) {
    return false;
  }
  return merchant;
}

module.exports = {createMerchant, deactivateMerchant};