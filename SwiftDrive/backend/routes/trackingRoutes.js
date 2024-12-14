const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');

router.post('/create', trackingController.createTracking);
router.get('/:bookingId', trackingController.getTrackingByBooking);

module.exports = router;