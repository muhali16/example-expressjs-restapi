const express = require('express');
const authController = require('../controllers/authController');

const asyncHandler = require('../utils/asyncHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/signing', authController.signing);
router.delete('/signout', authMiddleware, authController.signout);

module.exports = router;
