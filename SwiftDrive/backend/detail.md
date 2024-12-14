backend/

config/
env.js
require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
};
db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

exports.connectDB = connectDB;
controllers/
 analyticsController.js
exports.getAnalytics = async (req, res) => {
    try {
        // Example: Fetch analytics data
        const data = {
            totalUsers: 1000,
            activeBookings: 120,
            revenue: 50000,
        };
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching analytics', error });
    }
};
bookingController/
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
fleetController.js
const Fleet = require('../models/Fleet');

exports.addVehicle = async (req, res) => {
    try {
        const vehicle = new Fleet(req.body);
        const savedVehicle = await vehicle.save();
        res.status(201).json({
            success: true,
            data: savedVehicle
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Fleet.find();
        res.json({
            success: true,
            data: vehicles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
paymentController.js
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
reviewController.js/
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
trackingController.js
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
userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering user', error });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
};


middlewares/
authMiddleware.js
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.id };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = auth;
errorHandler.js
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.id };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = auth;

models/
Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fleet',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
Fleet.js
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
Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'bank_transfer'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    transactionDetails: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);

Rating.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Rating', ratingSchema);

Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fleet',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        minlength: 3
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);

vehicle.js
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

routes/
bookingRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createBooking, getAllBookings } = require('../controllers/bookingController');

// Protected routes - require authentication
router.post('/create', auth, createBooking);
router.get('/all', auth, getAllBookings);

module.exports = router;
fleetRoutes.js
const express = require('express');
const router = express.Router();
const { addVehicle, getAllVehicles } = require('../controllers/fleetController');

router.post('/', addVehicle);
router.get('/', getAllVehicles);

module.exports = router;
paymentRoutes.js
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
reviewRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { addReview, getVehicleReviews } = require('../controllers/reviewController');

router.post('/add', auth, addReview);
// Remove colon from URL parameter
router.get('/vehicle/:vehicleId', getVehicleReviews);

module.exports = router;
trackingRoutes.js
const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/trackingController');

router.post('/create', trackingController.createTracking);
router.get('/:bookingId', trackingController.getTrackingByBooking);

module.exports = router;
userRoutes.js
const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;


services/
emailService.js
const nodemailer = require('nodemailer');

exports.sendEmail = async (to, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text: message });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
notificationService.js
exports.sendNotification = (userId, message) => {
    // Mock notification service
    console.log(`Notification sent to user ${userId}: ${message}`);
};
utils/
constants.js
module.exports = {
    USER_ROLES: {
        ADMIN: 'admin',
        USER: 'user',
    },
    BOOKING_STATUS: {
        PENDING: 'pending',
        CONFIRMED: 'confirmed',
        CANCELLED: 'cancelled',
    },
};

loggar.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

module.exports = logger;

validator.js
exports.validateEmail = (email) => {
    const regex = /^[\w-.]+@[\w-]+\.[a-z]{2,7}$/i;
    return regex.test(email);
};

exports.validatePassword = (password) => {
    return password.length >= 6;
};

server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const fleetRoutes = require('./routes/fleetRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('./config/env');
const authRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Load env variables
dotenv.config();

// Connect Database
mongoose.connect(env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Database connection error:', err));

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/fleet', fleetRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




