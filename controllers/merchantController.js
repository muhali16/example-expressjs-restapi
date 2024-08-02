const merchantService = require('../services/merchantService');
const jsonResponse = require("../utils/jsonResponse");

const store = async (req, res) => {
  const {name, address, user} = req.body;
  const createMerchant = await merchantService.createMerchant({name, address, user});
  if (!createMerchant) {
    res.status(409).json(jsonResponse(409, null, "This user already has merchant"));
  }
  res.status(201).json(jsonResponse(201, createMerchant));
}

module.exports = {store}