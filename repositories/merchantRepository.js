const Merchant = require('../models/merchantModel');

const findByUserId = async (user) => {
  const merchant = await Merchant.findOne({user: user});
  if (!merchant) {
    return false;
  }
  return merchant;
}

const findById = async (merchantId) => {
  const merchant = await Merchant.findOne({_id: merchantId});
  if (!merchant)  {
    return false;
  }
  return merchant.populate('user');
}

const create = async (data) => {
  const {name, address, user} = data;
  const merchant = new Merchant({name, address, user});
  await merchant.save();
  return merchant
}

const updateMerchant = async (merchantId, data) => {
  const update = await Merchant.findOneAndUpdate(
      {_id: merchantId},
      {$set: data},
      {new: true, select: "uid name address balance isActive"}
  );
  return update;
}

module.exports = {create, findByUserId, findById, updateMerchant}