const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsControllers');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, bookingsController.listBookings);
router.get('/:id', protect, bookingsController.getBooking);
router.post('/', protect, bookingsController.createBooking);
router.patch('/:id', protect, bookingsController.updateBooking);
router.delete('/:id', protect, bookingsController.deleteBooking);

module.exports = router;
