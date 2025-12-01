const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { addLog } = require("../helper/logHelper");
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

exports.me = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await db.query(
      "SELECT id, name, npm, email, phone, role, is_active FROM users WHERE id = ? LIMIT 1",
      [decoded.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    const user = rows[0];
    res.json({ user });
  } catch (err) {
    console.error("Error in me:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { name, phone, password } = req.body;
    const updates = [];
    const params = [];
    if (name) {
      updates.push("name = ?");
      params.push(name);
    }
    if (phone) {
      updates.push("phone = ?");
      params.push(phone);
    }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      params.push(hashed);
    }
    if (updates.length === 0) return res.json({ message: "No changes" });
    params.push(userId);
    await db.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
      params
    );
    const [rows] = await db.query(
      "SELECT id, name, npm, email, phone, role, is_active FROM users WHERE id = ? LIMIT 1",
      [userId]
    );
    res.json({ user: rows[0] });
  } catch (err) {
    console.error("Error updating me:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);
    res.json({ message: "Logged out" });
    // Log logout if user available in request (protect middleware sets req.user), optional
    if (req.user) {
      addLog({
        user_id: req.user.id,
        role: req.user.role,
        action: "LOGOUT",
        table_name: "users",
        record_id: req.user.id,
        description: `User logged out - ID: ${req.user.id}`,
      });
    }
  } catch (err) {
    console.error("Logout error", err);
    res.status(500).json({ message: "Error during logout" });
  }
};

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1d",
  });
}

exports.register = async (req, res) => {
  try {
    let { name, npm, email, phone, password } = req.body;
    email = email?.trim().toLowerCase();

    if (!name || !npm || !email || !phone || !password) {
      const errors = {};
      if (!name) errors.name = "Nama harus diisi.";
      if (!npm) errors.npm = "NPM harus diisi.";
      if (!email) errors.email = "Email harus diisi.";
      if (!phone) errors.phone = "Nomor telepon harus diisi.";
      if (!password) errors.password = "Password harus diisi.";
      return res.status(400).json({ message: "Field tidak lengkap.", errors });
    }

    const [existing] = await db.query(
      `SELECT id FROM users WHERE email = ? OR npm = ? LIMIT 1`,
      [email, npm]
    );
    console.log("Register attempt:", {
      email,
      npm,
      origin: req.headers.origin || req.ip,
    });
    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Email atau NPM sudah terdaftar." });
    }

    const hashed = await bcrypt.hash(password, 10);

    let result;
    try {
      [result] = await db.query(
        `INSERT INTO users (name, npm, email, phone, password, role, is_active) VALUES 
                (?, ?, ?, ?, ?, 'mahasiswa', 0)`,
        [name, npm, email, phone, hashed]
      );
    } catch (err) {
      // Duplicate entry
      if (err && err.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: "Email atau NPM sudah terdaftar." });
      }
      console.error("Database error creating user:", err);
      return res
        .status(500)
        .json({ message: "Gagal mendaftarkan akun. Silakan coba lagi." });
    }

    const newUserId = result.insertId;

    console.log("New user registered:", {
      id: newUserId,
      email,
      npm,
      origin: req.headers.origin || req.ip,
    });
    await addLog({
      user_id: newUserId,
      role: "mahasiswa",
      action: "REGISTER",
      record_id: newUserId,
      description: `Mahasiswa baru - Email: ${email}`,
    });

    // New users require admin approval before becoming active
    // Do not auto-login or set token cookie here
    res.status(201).json({
      message: "Registrasi berhasil. Akun menunggu persetujuan admin.",
      user: {
        id: newUserId,
        name,
        npm,
        email,
        phone,
        role: "mahasiswa",
        is_active: 0,
      },
    });
  } catch (error) {
    console.error("Error pada registrasi:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ message: "Wajib isi semua field." });
    }

    const [rows] = await db.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Email atau password salah." });
    }

    const user = rows[0];

    if (!user.is_active) {
      return res
        .status(403)
        .json({ message: "Akun Anda tidak aktif. Silakan hubungi admin." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Email atau password salah." });
    }

    console.log("Login attempt:", {
      email,
      origin: req.headers.origin || req.ip,
    });
    const token = generateToken(user);
    res.cookie("token", token, COOKIE_OPTIONS);

    await addLog({
      user_id: user.id,
      role: user.role,
      action: "LOGIN",
      table_name: "users",
      record_id: user.id,
      description: `User logged in - Email: ${email} - Role: ${user.role}`,
    });

    res.json({
      message: "Login berhasil.",
      user: {
        id: user.id,
        name: user.name,
        npm: user.npm,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error pada login:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
    console.log("Login success:", { email, id: user.id });
  }
};
