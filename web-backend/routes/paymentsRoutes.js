const express = require('express');
const router = express.Router();
const { createPayment, simulateSettlement, simulateRefund } = require('../controllers/paymentsControllers');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Create a simulated payment order (owner or admin)
router.post('/:id/create', protect, createPayment);
// Admin simulate settlement
router.post('/:id/simulate', protect, isAdmin, simulateSettlement);
// Admin simulate refund
router.post('/:id/refund', protect, isAdmin, simulateRefund);

module.exports = router;
