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
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        user: String,
        comment: String,
        rating: Number
    }],
    imageUrl: {
        type: String,
        required: true
    },
    features: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);