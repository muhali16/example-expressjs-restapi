const express = require('express');
const userController = require('../controllers/userController');

const asyncHandler = require('../utils/asyncHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', asyncHandler(userController.index));
router.get('/:username', asyncHandler(userController.show));
router.delete('/:userId/delete/account', userController.deleteAccount); // delete account by user id

router.post('/:userId/update/username', asyncHandler(userController.changeUsername)); // change username by user Id

module.exports = router;
