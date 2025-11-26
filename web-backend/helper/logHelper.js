const db = require('../config/db');

async function addLog({ user_id = null, role = null, action, table_name, record_id = null, description = null }) {
  try {
    await db.query(
      `INSERT INTO log_transaksi (user_id, role, action, table_name, record_id, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, role, action, table_name, record_id, description]
    );
  } catch (err) {
    console.error('Error saving log:', err.message);
  }
}

module.exports = { addLog };
