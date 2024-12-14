const Tracking = require('../models/Tracking');

// Create tracking
exports.createTracking = async (req, res) => {
    try {
        const tracking = new Tracking({
            booking: req.body.bookingId,
            status: req.body.status,
            location: req.body.location
        });
        const savedTracking = await tracking.save();
        res.status(201).json(savedTracking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get tracking by booking
exports.getTrackingByBooking = async (req, res) => {
    try {
        const tracking = await Tracking.findOne({ booking: req.params.bookingId })
            .populate('booking');
        if (!tracking) {
            return res.status(404).json({ message: 'Tracking not found' });
        }
        res.json(tracking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};