const merchantService = require('../services/merchantService');
const jsonResponse = require("../utils/jsonResponse");
const merchantRepository = require("../repositories/merchantRepository");

const store = async (req, res) => {
  const {name, address, user} = req.body;
  const createMerchant = await merchantService.createMerchant({name, address, user});
  if (!createMerchant) {
    res.status(409).json(jsonResponse(409, null, "This user already has merchant or user not found"));
  }
  res.status(201).json(jsonResponse(201, createMerchant));
}

const show = async (req, res) => {
  const {merchantId} = req.params;
  const merchant = await merchantRepository.findById(merchantId);
  if (!merchant) {
    res.status(404).json(jsonResponse(404, null, "Merchant not found"));
  }
  res.status(200).json(jsonResponse(200, merchant));
}

const update = async (req, res) => {
  const {merchantId} = req.params;
  const merchantUpdate = await merchantRepository.updateMerchant(merchantId, req.body);
  if (!merchantUpdate) {
    res.status(404).json(jsonResponse(404, null, "Merchant not found"));
  }
  res.status(200).json(jsonResponse(200, merchantUpdate));
}

module.exports = {store, show, update}