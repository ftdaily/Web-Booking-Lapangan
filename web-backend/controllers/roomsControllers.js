const db = require('../config/db');

exports.listRooms = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const q = req.query.q || '';
    const type = req.query.type || '';
    const minPrice = req.query.min_price ? Number(req.query.min_price) : null;
    const maxPrice = req.query.max_price ? Number(req.query.max_price) : null;

    let query = 'SELECT * FROM rooms WHERE 1=1';
    const params = [];

    if (q) {
      query += ' AND name LIKE ?';
      params.push(`%${q}%`);
    }

    if (type) {
      query += ' AND `type` = ?';
      params.push(type);
    }

    if (minPrice !== null) { query += ' AND price_per_hour >= ?'; params.push(minPrice); }
    if (maxPrice !== null) { query += ' AND price_per_hour <= ?'; params.push(maxPrice); }

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.query(query, params);

    // Count (apply same filters)
    let countQuery = 'SELECT COUNT(*) as total FROM rooms WHERE 1=1';
    const countParams = [];
    if (q) { countQuery += ' AND name LIKE ?'; countParams.push(`%${q}%`); }
    if (type) { countQuery += ' AND `type` = ?'; countParams.push(type); }
    if (minPrice !== null) { countQuery += ' AND price_per_hour >= ?'; countParams.push(minPrice); }
    if (maxPrice !== null) { countQuery += ' AND price_per_hour <= ?'; countParams.push(maxPrice); }
    const [countResult] = await db.query(countQuery, countParams);
    const total = countResult[0].total || 0;

    // Parse facilities JSON if necessary
    const parsedRows = rows.map(row => ({
      ...row,
      facilities: typeof row.facilities === 'string' && row.facilities ? JSON.parse(row.facilities) : row.facilities || [],
    }));
    res.json({ data: parsedRows, page, limit, total });
  } catch (err) {
    console.error('Error listing rooms', err);
    res.status(500).json({ message: 'Failed to get rooms' });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM rooms WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Room not found' });
    const row = rows[0];
    row.facilities = typeof row.facilities === 'string' && row.facilities ? JSON.parse(row.facilities) : row.facilities || [];
    res.json(row);
  } catch (err) {
    console.error('Error get room', err);
    res.status(500).json({ message: 'Failed to get room' });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { name, location, description, price_per_hour, is_active, type, capacity, image, facilities } = req.body;
    const [result] = await db.query(
      'INSERT INTO rooms (name, location, description, price_per_hour, is_active, `type`, capacity, image, facilities, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
      [
        name,
        location,
        description,
        price_per_hour || 0,
        is_active ? 1 : 0,
        type || null,
        capacity || null,
        image || null,
        facilities ? JSON.stringify(facilities) : JSON.stringify([]),
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error create room', err);
    res.status(500).json({ message: 'Failed to create room' });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, description, price_per_hour, is_active, type, capacity, image, facilities } = req.body;
    await db.query(
      'UPDATE rooms SET name = ?, location = ?, description = ?, price_per_hour = ?, is_active = ?, `type` = ?, capacity = ?, image = ?, facilities = ? WHERE id = ?',
      [name, location, description, price_per_hour, is_active ? 1 : 0, type || null, capacity || null, image || null, facilities ? JSON.stringify(facilities) : JSON.stringify([]), id]
    );
    res.json({ message: 'Updated' });
  } catch (err) {
    console.error('Error update room', err);
    res.status(500).json({ message: 'Failed to update room' });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM rooms WHERE id = ?', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error delete room', err);
    res.status(500).json({ message: 'Failed to delete room' });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingDate = req.query.date;
    if (!bookingDate) return res.status(400).json({ message: 'Missing date parameter' });
    const [rows] = await db.query(
      'SELECT start_time, end_time, status FROM bookings WHERE room_id = ? AND booking_date = ? AND status NOT IN ("cancelled","rejected")',
      [id, bookingDate]
    );
    res.json({ data: rows });
  } catch (err) {
    console.error('Error get availability', err);
    res.status(500).json({ message: 'Failed to get availability' });
  }
};
