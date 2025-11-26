const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherControllers');

// GET /api/weather
router.get('/', getWeather);

module.exports = router;