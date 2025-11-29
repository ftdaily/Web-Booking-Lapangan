const db = require('../config/db');
const { addLog } = require('../helper/logHelper');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
  try {
    const { is_active } = req.query; // optional filter
    let sql = 'SELECT id, name, npm, email, phone, role, is_active, created_at FROM users';
    const params = [];
    if (typeof is_active !== 'undefined') {
      sql += ' WHERE is_active = ?';
      const activeVal = parseInt(is_active, 10) === 1 ? 1 : 0;
      params.push(activeVal);
    }
    sql += ' ORDER BY created_at DESC';
    const [rows] = await db.query(sql, params);
    res.json({ users: rows });
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).json({ message: 'Gagal mengambil daftar pengguna.' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT id, name, npm, email, phone, role, is_active, created_at FROM users WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User tidak ditemukan.' });
    res.json({ user: rows[0] });
  } catch (err) {
    console.error('Error getUser:', err);
    res.status(500).json({ message: 'Gagal mengambil user.' });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT id, name, role, is_active FROM users WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User tidak ditemukan.' });
    const user = rows[0];
    if (user.is_active === 1) {
      return res.status(400).json({ message: 'Akun sudah aktif.' });
    }

    await db.query('UPDATE users SET is_active = 1 WHERE id = ?', [id]);

    await addLog({
      user_id: req.user.id,
      role: req.user.role,
      action: 'APPROVE_USER',
      table_name: 'users',
      record_id: parseInt(id, 10),
      description: `Admin ${req.user.id} approved user id ${id}`
    });

    res.json({ message: 'User telah disetujui.' });
  } catch (err) {
    console.error('Error approving user:', err);
    res.status(500).json({ message: 'Gagal menyetujui user.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // prevent admin deleting themself
    if (parseInt(id, 10) === req.user.id) {
      return res.status(400).json({ message: 'Tidak dapat menghapus akun sendiri.' });
    }

    const [rows] = await db.query('SELECT id, name, role FROM users WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User tidak ditemukan.' });
    const user = rows[0];
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Tidak dapat menghapus akun admin.' });
    }

    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan.' });

    await addLog({
      user_id: req.user.id,
      role: req.user.role,
      action: 'DELETE_USER',
      table_name: 'users',
      record_id: parseInt(id, 10),
      description: `Admin ${req.user.id} deleted user id ${id}`
    });

    res.json({ message: 'User berhasil dihapus.' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Gagal menghapus user.' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, npm, email, phone, role = 'mahasiswa', password, is_active = 1 } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing required fields' });
    const normalizedEmail = email.trim().toLowerCase();
    const [existing] = await db.query('SELECT id FROM users WHERE email = ? OR npm = ? LIMIT 1', [normalizedEmail, npm]);
    if (existing.length > 0) return res.status(409).json({ message: 'Email or NPM already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO users (name, npm, email, phone, password, role, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())', [name, npm, normalizedEmail, phone, hashed, role, is_active ? 1 : 0]);
    const newId = result.insertId;
    await addLog({ user_id: req.user.id, role: req.user.role, action: 'CREATE_USER', table_name: 'users', record_id: newId, description: `Admin ${req.user.id} created user ${normalizedEmail}` });
    res.status(201).json({ message: 'User created', id: newId });
  } catch (err) {
    console.error('Error create user:', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, npm, email, phone, role, password, is_active } = req.body;
    const [rows] = await db.query('SELECT id, email, role FROM users WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    const updates = [];
    const params = [];
    if (name) { updates.push('name = ?'); params.push(name); }
    if (npm) { updates.push('npm = ?'); params.push(npm); }
    if (email) { updates.push('email = ?'); params.push(email.trim().toLowerCase()); }
    if (phone) { updates.push('phone = ?'); params.push(phone); }
    if (role) { updates.push('role = ?'); params.push(role); }
    if (typeof is_active !== 'undefined') { updates.push('is_active = ?'); params.push(is_active ? 1 : 0); }
    if (password) { const hashed = await bcrypt.hash(password, 10); updates.push('password = ?'); params.push(hashed); }
    if (updates.length === 0) return res.json({ message: 'No changes' });
    params.push(id);
    await db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, params);
    await addLog({ user_id: req.user.id, role: req.user.role, action: 'UPDATE_USER', table_name: 'users', record_id: parseInt(id, 10), description: `Admin ${req.user.id} updated user ${id}` });
    res.json({ message: 'User updated' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};
