const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Process Payment
exports.processPayment = async (req, res) => {
    try {
        const { bookingId, amount, paymentMethod } = req.body;
        
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        const payment = await Payment.create({
            booking: bookingId,
            amount,
            paymentMethod,
            status: 'completed'
        });

        await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' });

        res.status(201).json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get Payment History
exports.getPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate('booking')
            .sort('-createdAt');
        
        res.json({
            success: true,
            data: payments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Payment By ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('booking');
            
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            });
        }

        res.json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};