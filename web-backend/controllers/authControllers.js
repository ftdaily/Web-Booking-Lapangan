const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addLog } = require('../helper/logHelper');

function generateToken(user) {
    return jwt.sign(
        {id : user.id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES || '1d'}
    );
}

exports.register = async (req, res) => {
    try {
        const { name, npm, email, phone, password } = req.body;

        if (!name || !npm || !email || !phone || !password) {
            return res.status(400).json({ message: 'Wajib isi semua field.' });
        }

        const [existing] = await db.query(
            `SELECT id FROM users WHERE email = ? OR npm = ? LIMIT 1`,
            [email, npm]
        );
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email atau NPM sudah terdaftar.' });
        }

        const hashed = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            `INSERT INTO users (name, npm, email, phone, password, role, is_active) VALUES 
            (?, ?, ?, ?, ?, 'mahasiswa', 0)`,
            [name, npm, email, phone, hashed]
        );

        const newUserId = result.insertId;

        await addLog({
            user_id: newUserId,
            role: 'mahasiswa',
            action: 'REGISTER',
            record_id: newUserId,
            description: `Mahasiswa baru - Email: ${email}`
        });

        const token = generateToken({ id: newUserId, role: 'mahasiswa' });

        res.status(201).json({
            message: 'Registrasi berhasil.',
            token,

            user: {
                id: newUserId,
                name,
                npm,
                email,
                phone,
                role: 'mahasiswa'
            }
        });
    } catch (error) {
        console.error('Error pada registrasi:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Wajib isi semua field.' });
        }

        const [rows] = await db.query(
            `SELECT * FROM users WHERE email = ? LIMIT 1`,
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Email atau password salah.' });
        }

        const user = rows[0];

        if (!user.is_active) {
            return res.status(403).json({ message: 'Akun Anda tidak aktif. Silakan hubungi admin.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Email atau password salah.' });
        }

        const token = generateToken(user);

        await addLog({
            user_id: user.id,
            role: user.role,
            action: 'LOGIN',
            table_name: 'users',
            record_id: user.id,
            description: `User logged in - Email: ${email} - Role: ${user.role}`
        });

        res.json({
            message: 'Login berhasil.',
            token,
            user: {
                id: user.id,
                name: user.name,
                npm: user.npm,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error pada login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
}