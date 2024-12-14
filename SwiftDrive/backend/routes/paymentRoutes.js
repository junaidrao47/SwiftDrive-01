const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { 
    processPayment, 
    getPaymentHistory, 
    getPaymentById 
} = require('../controllers/paymentController');

router.post('/process', auth, processPayment);
router.get('/history', auth, getPaymentHistory);
router.get('/:id', auth, getPaymentById);

module.exports = router;