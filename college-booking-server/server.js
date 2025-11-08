
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const collegeRoutes = require('./routes/colleges');
const admissionRoutes = require('./routes/admissions');
const reviewRoutes = require('./routes/reviews');
const connectDB = require('./config/database');


const app = express();

// Middleware
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://college-booking-application.vercel.app",
            "https://college-booking-application-46xf.vercel.app",
            "https://college-booking-application-46xf-jlcmtmtz1-joy-halders-projects.vercel.app"
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admissions', admissionRoutes);


// Home route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'College Booking API is running...',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            colleges: '/api/colleges',
            admissions: '/api/admissions',
            reviews: '/api/reviews'
        }
    });
});

// 404 handler
// app.use('*', (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'Route not found'
//     });
// });

// Error handling middleware
app.use(require('./middleware/error'));

// Database connection
connectDB()

const PORT = process.env.PORT || 5000;

// Start server

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});
