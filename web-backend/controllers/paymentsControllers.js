const db = require('../config/db');

// Create simulated payment order
exports.createPayment = async (req, res) => {
  try {
    const { id } = req.params; // booking id
    const bookingId = parseInt(id, 10);
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ? LIMIT 1', [bookingId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Booking not found' });
    const booking = rows[0];

    // Ensure user is authenticated
    if (!req.user) {
      console.warn('Unauthenticated createPayment attempt', { bookingId, ip: req.ip, headers: req.headers['user-agent'] });
      return res.status(401).json({ message: 'Not authenticated' });
    }
    // Only owner or admin can create a payment for booking
    if (req.user.role !== 'admin' && booking.user_id !== req.user.id) {
      console.warn('Unauthorized createPayment attempt', { bookingId, user: req.user, bookingUser: booking.user_id });
      return res.status(403).json({ message: 'Forbidden: you are not the booking owner' });
    }

    // Log request
    console.log('CreatePayment request', { bookingId, userId: req.user.id });
    // Generate a fake order id
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    const orderId = `ORDER-${bookingId}-${rand}`;

    // Return order id payload (no DB write required) — frontend will just display QR and wait for admin simulate
    res.json({ order_id: orderId, booking_id: bookingId, booking_user: booking.user_id, message: 'Simulated order created' });
  } catch (err) {
    console.error('Error create payment', err);
    res.status(500).json({ message: 'Failed to create payment' });
  }
};

// Admin endpoint to simulate settlement
exports.simulateSettlement = async (req, res) => {
  try {
    const { id } = req.params; // booking id
    const bookingId = parseInt(id, 10);
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ? LIMIT 1', [bookingId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Booking not found' });

    // Only admin allowed to mark as paid
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    await db.query('UPDATE bookings SET status = ? WHERE id = ?', ['confirmed', bookingId]);
    res.json({ message: 'Booking marked as confirmed (paid)' });
  } catch (err) {
    console.error('Error simulate settlement', err);
    res.status(500).json({ message: 'Failed to simulate settlement' });
  }
};

// Admin endpoint to simulate refund (set to cancelled)
exports.simulateRefund = async (req, res) => {
  try {
    const { id } = req.params; // booking id
    const bookingId = parseInt(id, 10);
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ? LIMIT 1', [bookingId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Booking not found' });

    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    await db.query('UPDATE bookings SET status = ? WHERE id = ?', ['cancelled', bookingId]);
    res.json({ message: 'Booking marked as refunded (cancelled)' });
  } catch (err) {
    console.error('Error simulate refund', err);
    res.status(500).json({ message: 'Failed to simulate refund' });
  }
};
