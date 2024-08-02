const merchantService = require('../services/merchantService');
const jsonResponse = require("../utils/jsonResponse");

const store = async (req, res) => {
  const {name, address} = req.body;
  const {uid} = req.query;
  const createMerchant = await merchantService.createMerchant(uid, {name, address});
  res.status(201).json(jsonResponse(201, createMerchant));
}

module.exports = {store}