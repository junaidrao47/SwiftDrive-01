const Review = require('../models/Review');
const Fleet = require('../models/Fleet');
const mongoose = require('mongoose');

exports.addReview = async (req, res) => {
    try {
        const { vehicleId, rating, comment } = req.body;

        // Validate vehicleId format
        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid vehicle ID format"
            });
        }

        // Check if vehicle exists
        const vehicle = await Fleet.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            });
        }

        const review = new Review({
            user: req.user._id,
            vehicle: vehicleId,
            rating,
            comment
        });

        const savedReview = await review.save();
        
        res.status(201).json({
            success: true,
            data: savedReview
        });
    } catch (error) {
        console.error('Review error:', error);
        res.status(400).json({
            success: false,
            message: "Error adding review",
            error: error.message
        });
    }
};
exports.getVehicleReviews = async (req, res) => {
    try {
        const { vehicleId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid vehicle ID format"
            });
        }

        const reviews = await Review.find({ vehicle: vehicleId })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching reviews",
            error: error.message
        });
    }
};