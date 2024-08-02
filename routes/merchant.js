const express = require('express');
const merchantController = require('../controllers/merchantController');

const router = express.Router();

router.post('/?uid=', merchantController.store); // create new merchant with user id query param

module.exports = router;