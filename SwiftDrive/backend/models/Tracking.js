const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    status: {
        type: String,
        enum: ['picked', 'in-use', 'returned'],
        default: 'picked'
    },
    location: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Tracking', trackingSchema);