const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    registration: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'rented', 'maintenance'],
        default: 'available'
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);