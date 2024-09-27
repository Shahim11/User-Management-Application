const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authToken');
const usersController = require('../controllers/usersController');
const blockController = require('../controllers/blockController');
const unblockController = require('../controllers/unblockController');
const deleteController = require('../controllers/deleteController');

router.get('/users', authenticateToken, usersController.getUser);
router.post('/block', authenticateToken, blockController.blockUser);
router.post('/unblock', authenticateToken, unblockController.unblockUser);
router.post('/delete', authenticateToken, deleteController.deleteUser);

module.exports = router;