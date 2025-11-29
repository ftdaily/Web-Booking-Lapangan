require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const db = require('./config/db');
db.query('SELECT 1')
    .then(() => console.log('DB NYAMBUNGGG'))
    .catch(err => console.error('DB TURUUUU', err));

const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes'); 
const roomsRoutes = require('./routes/roomsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const usersRoutes = require('./routes/usersRoutes');

// Middleware
// Allow CORS with cookies (credentials) for the frontend
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://127.0.0.1:3000';
const allowedOrigins = [FRONTEND_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        // For development, allow both localhost forms
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        console.warn('CORS blocked request from origin:', origin);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes); // Add weather route
app.use('/api/rooms', roomsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/users', usersRoutes);

// Rute Tes
app.get('/', (req, res) => {
    res.send({ messages: 'API API API PANASSS' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});