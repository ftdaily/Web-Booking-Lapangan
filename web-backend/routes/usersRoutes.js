const express = require('express');
const router = express.Router();
const { getUsers, getUser, approveUser, deleteUser, createUser, updateUser } = require('../controllers/usersControllers');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// List users (admin only). Optional ?is_active=0 to filter pending
router.get('/', protect, isAdmin, getUsers);
// Get single user
router.get('/:id', protect, isAdmin, getUser);

// Approve user (admin only)
router.patch('/:id/approve', protect, isAdmin, approveUser);

// Delete / reject user (admin only)
router.delete('/:id', protect, isAdmin, deleteUser);

// Create and update user (admin only)
router.post('/', protect, isAdmin, createUser);
router.put('/:id', protect, isAdmin, updateUser);

module.exports = router;
