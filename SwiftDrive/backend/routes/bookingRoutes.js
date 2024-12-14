const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createBooking, getAllBookings } = require('../controllers/bookingController');

// Protected routes - require authentication
router.post('/create', auth, createBooking);
router.get('/all', auth, getAllBookings);

module.exports = router;