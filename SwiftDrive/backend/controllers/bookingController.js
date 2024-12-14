const Booking = require('../models/Booking');
const Fleet = require('../models/Fleet');

exports.createBooking = async (req, res) => {
    try {
        const { vehicleId, startDate, endDate } = req.body;
        
        // Validate dates
        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({
                success: false,
                message: 'Start date cannot be after end date'
            });
        }

        // Get vehicle
        const vehicle = await Fleet.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        // Calculate amount
        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        const totalAmount = days * vehicle.price;

        // Create booking
        const newBooking = await Booking.create({
            user: req.user._id,
            vehicle: vehicleId,
            startDate,
            endDate,
            totalAmount
        });

        res.status(201).json({
            success: true,
            data: newBooking
        });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id });
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};