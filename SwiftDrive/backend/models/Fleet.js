const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    image: String
}, { timestamps: true });

module.exports = mongoose.model('Fleet', fleetSchema);