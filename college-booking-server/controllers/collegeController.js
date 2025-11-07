// controllers/collegeController.js
const College = require('../models/College');
const Review = require('../models/Review');

// @desc    Get all colleges
// @route   GET /api/colleges
// @access  Public
exports.getColleges = async (req, res, next) => {
    try {
        // Filtering, sorting, pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        let query = {};
        
        // Search
        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: 'i' };
        }
        
        // Filter by rating
        if (req.query.rating) {
            query.rating = { $gte: parseFloat(req.query.rating) };
        }

        const colleges = await College.find(query)
            .sort('-createdAt')
            .skip(skip)
            .limit(limit);

        const total = await College.countDocuments(query);

        res.json({
            success: true,
            count: colleges.length,
            pagination: {
                page,
                pages: Math.ceil(total / limit),
                total
            },
            data: colleges
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single college
// @route   GET /api/colleges/:id
// @access  Public
exports.getCollege = async (req, res, next) => {
    try {
        const college = await College.findById(req.params.id);

        if (!college) {
            return res.status(404).json({
                success: false,
                message: 'College not found'
            });
        }

        res.json({
            success: true,
            data: college
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get college reviews
// @route   GET /api/colleges/:id/reviews
// @access  Public
exports.getCollegeReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ college: req.params.id })
            .populate('user', 'name photo')
            .sort('-createdAt');

        res.json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        next(error);
    }
};