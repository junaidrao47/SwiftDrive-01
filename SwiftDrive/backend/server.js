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
