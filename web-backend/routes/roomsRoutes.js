const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/roomsControllers');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public listing and details
router.get('/', roomsController.listRooms);
router.get('/:id', roomsController.getRoom);
router.get('/:id/availability', roomsController.getAvailability);

// Admin-only CRUD
router.post('/', protect, isAdmin, roomsController.createRoom);
router.put('/:id', protect, isAdmin, roomsController.updateRoom);
router.delete('/:id', protect, isAdmin, roomsController.deleteRoom);

module.exports = router;
