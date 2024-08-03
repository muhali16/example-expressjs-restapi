const express = require('express');
const merchantController = require('../controllers/merchantController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', merchantController.store); // create new merchant with user id query param
router.get('/:merchantId', merchantController.show);
router.post('/:merchantId/update', merchantController.update); // update merchant by merchant id

module.exports = router;