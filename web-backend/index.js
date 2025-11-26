require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const db = require('./config/db');
db.query('SELECT 1')
    .then(() => console.log('DB NYAMBUNGGG'))
    .catch(err => console.error('DB TURUUUU', err));

const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Rute Tes
app.get('/', (req, res) => {
    res.send({ messages: 'API API API PANASSS' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});