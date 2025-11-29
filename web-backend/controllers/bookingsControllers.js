const db = require('../config/db');

exports.listBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || '';
    const userIdFilter = req.query.user_id || null;
    // return more frontend-friendly fields (customer, phone, court, date, time, amount, bookingCode, createdAt)
    let baseSelect = `SELECT b.*, u.name as customer, u.phone as phone, r.name as court, 
      b.booking_date as date, CONCAT(b.start_time, ' - ', b.end_time) as time, 
      b.total_price as amount, b.created_at as createdAt, CONCAT('BK', LPAD(b.id, 4, '0')) as bookingCode 
      FROM bookings b JOIN users u ON u.id = b.user_id JOIN rooms r ON r.id = b.room_id WHERE 1=1`;
    let whereClause = '';
    const params = [];

    if (status) {
      whereClause += ' AND b.status = ?';
      params.push(status);
    }

    if (userIdFilter) {
      whereClause += ' AND b.user_id = ?';
      params.push(userIdFilter);
    }

    // default: if not admin, only its own bookings
    if (!req.user || req.user.role !== 'admin') {
      whereClause += ' AND b.user_id = ?';
      params.push(req.user?.id || 0);
    }

    const dataQuery = baseSelect + whereClause + ' ORDER BY b.booking_date DESC, b.start_time LIMIT ? OFFSET ?';
    const dataParams = [...params, limit, offset];

    const countQuery = 'SELECT COUNT(*) as total FROM bookings b WHERE 1=1' + whereClause;
    const countParams = [...params];
    const [countRows] = await db.query(countQuery, countParams);
    const total = countRows && countRows.length ? (countRows[0].total || 0) : 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const [rows] = await db.query(dataQuery, dataParams);

    res.json({ data: rows, page, limit, total, totalPages });
  } catch (err) {
    console.error('Error listing bookings', err);
    res.status(500).json({ message: 'Failed to get bookings' });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(`SELECT b.*, u.name as customer, u.phone as phone, r.name as court, 
      b.booking_date as date, CONCAT(b.start_time, ' - ', b.end_time) as time, 
      b.total_price as amount, b.created_at as createdAt, CONCAT('BK', LPAD(b.id, 4, '0')) as bookingCode 
      FROM bookings b JOIN users u ON u.id = b.user_id JOIN rooms r ON r.id = b.room_id WHERE b.id = ? LIMIT 1`, [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Booking not found' });
    const booking = rows[0];

    // if not admin and not owner
    if (req.user.role !== 'admin' && booking.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    res.json(booking);
  } catch (err) {
    console.error('Error get booking', err);
    res.status(500).json({ message: 'Failed to get booking' });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { room_id, booking_date, start_time, end_time, total_price, note } = req.body;

    // Check availability: simple check for overlapping bookings
    const [existing] = await db.query('SELECT * FROM bookings WHERE room_id = ? AND booking_date = ? AND ((start_time BETWEEN ? AND ?) OR (end_time BETWEEN ? AND ?))', [room_id, booking_date, start_time, end_time, start_time, end_time]);
    if (existing.length > 0) return res.status(409).json({ message: 'Time slot already booked' });

    const [result] = await db.query('INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time, total_price, status, note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())', [user_id, room_id, booking_date, start_time, end_time, total_price || 0, 'pending', note || null]);

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error create booking', err);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, booking_date, start_time, end_time, total_price, note } = req.body;

    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Booking not found' });
    const booking = rows[0];

    if (req.user.role !== 'admin' && booking.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const updates = [];
    const params = [];
    if (status) { updates.push('status = ?'); params.push(status); }
    if (booking_date) { updates.push('booking_date = ?'); params.push(booking_date); }
    if (start_time) { updates.push('start_time = ?'); params.push(start_time); }
    if (end_time) { updates.push('end_time = ?'); params.push(end_time); }
    if (total_price) { updates.push('total_price = ?'); params.push(total_price); }
    if (note !== undefined) { updates.push('note = ?'); params.push(note); }

    if (updates.length === 0) return res.json({ message: 'No changes' });

    params.push(id);
    await db.query(`UPDATE bookings SET ${updates.join(', ')} WHERE id = ?`, params);

    res.json({ message: 'Updated' });
  } catch (err) {
    console.error('Error update booking', err);
    res.status(500).json({ message: 'Failed to update booking' });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Booking not found' });
    const booking = rows[0];
    if (req.user.role !== 'admin' && booking.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await db.query('DELETE FROM bookings WHERE id = ?', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error delete booking', err);
    res.status(500).json({ message: 'Failed to delete booking' });
  }
};
