const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { addReview, getVehicleReviews } = require('../controllers/reviewController');

router.post('/add', auth, addReview);
// Remove colon from URL parameter
router.get('/vehicle/:vehicleId', getVehicleReviews);

module.exports = router;