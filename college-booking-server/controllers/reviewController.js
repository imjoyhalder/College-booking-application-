// controllers/reviewController.js
const Review = require('../models/Review');
const Admission = require('../models/Admission');

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
    try {
        // Check if user has applied to this college
        const hasApplied = await Admission.findOne({
            user: req.user.id,
            college: req.body.college
        });

        if (!hasApplied) {
            return res.status(400).json({
                success: false,
                message: 'You can only review colleges you have applied to'
            });
        }

        // Check if already reviewed
        const existingReview = await Review.findOne({
            user: req.user.id,
            college: req.body.college
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'Already reviewed this college'
            });
        }

        // Add user to req.body
        req.body.user = req.user.id;

        const review = await Review.create(req.body);

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user reviews
// @route   GET /api/reviews/my-reviews
// @access  Private
exports.getMyReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ user: req.user.id })
            .populate('college', 'name image location')
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