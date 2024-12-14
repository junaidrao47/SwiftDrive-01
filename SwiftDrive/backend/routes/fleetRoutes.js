const express = require('express');
const router = express.Router();
const { addVehicle, getAllVehicles } = require('../controllers/fleetController');

router.post('/', addVehicle);
router.get('/', getAllVehicles);

module.exports = router;