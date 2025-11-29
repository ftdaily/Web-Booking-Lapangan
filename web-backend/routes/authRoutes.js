const express = require('express');
const router = express.Router();
const { register, login, me, logout, updateMe } = require('../controllers/authControllers');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);
router.post('/logout', logout);
router.put('/me', protect, updateMe);

module.exports = router;