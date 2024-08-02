const express = require('express');
const userController = require('../controllers/userController');

const asyncHandler = require('../utils/asyncHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', asyncHandler(userController.index));
router.get('/:username', asyncHandler(userController.show));

module.exports = router;
