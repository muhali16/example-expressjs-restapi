const Mercant = require('../models/merchantModel');

const findByUserId = async (user) => {
  const merchant = await Mercant.findOne({user: user});
  if (!merchant) {
    return false;
  }
  return merchant;
}

const create = async (data) => {
  const {name, address, user} = data;
  const merchant = new Mercant({name, address, user});
  await merchant.save();
  return merchant
}

module.exports = {create, findByUserId}