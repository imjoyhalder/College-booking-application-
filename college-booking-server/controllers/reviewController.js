// controllers/reviewController.js
const Review = require('../models/Review');
const Admission = require('../models/Admission');
const College = require('../models/College');

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


// @desc    Create review
// @route   POST /api/reviews
// @access  Public (or Private based on your auth)
exports.createReview = async (req, res, next) => {
    try {
        const { email, college, rating, comment } = req.body;

        // Validate required fields
        if (!email || !college || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email, college, rating and comment'
            });
        }

        // Check if user has applied to this college
        const hasApplied = await Admission.findOne({
            email: email.toLowerCase(),
            college: college
        });

        if (!hasApplied) {
            return res.status(400).json({
                success: false,
                message: 'You can only review colleges you have applied to'
            });
        }

        // Check if already reviewed
        const existingReview = await Review.findOne({
            email: email.toLowerCase(),
            college: college
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'Already reviewed this college'
            });
        }

        const review = await Review.create({
            email: email.toLowerCase(),
            college,
            rating,
            comment
        });

        // Populate college details in response
        await review.populate('college', 'name image location rating established');

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: review
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this college'
            });
        }
        console.error('Create review error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating review'
        });
    }
};

// @desc    Get all reviews with college details
// @route   GET /api/reviews
// @access  Public
exports.getAllReviews = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, college, rating } = req.query;

        // Build filter object
        const filter = {};
        if (college) filter.college = college;
        if (rating) filter.rating = rating;

        const reviews = await Review.find(filter)
            .populate('college', 'name image location rating established researchCount')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Review.countDocuments(filter);

        res.json({
            success: true,
            count: reviews.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            data: reviews
        });
    } catch (error) {
        console.error('Get all reviews error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching reviews'
        });
    }
};

// @desc    Get reviews by user email
// @route   GET /api/reviews/user/:email
// @access  Public
exports.getReviewsByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const { page = 1, limit = 10 } = req.query;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const reviews = await Review.find({ email: email.toLowerCase() })
            .populate('college', 'name image location rating established researchCount')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Review.countDocuments({ email: email.toLowerCase() });

        res.json({
            success: true,
            count: reviews.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            data: reviews
        });
    } catch (error) {
        console.error('Get reviews by email error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user reviews'
        });
    }
};

// @desc    Get reviews by college ID
// @route   GET /api/reviews/college/:collegeId
// @access  Public
// exports.getReviewsByCollege = async (req, res, next) => {
//     try {
//         const { collegeId } = req.params;
//         const { page = 1, limit = 10 } = req.query;

//         const reviews = await Review.find({ college: collegeId })
//             .populate('college', 'name image location')
//             .sort({ createdAt: -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);

//         const total = await Review.countDocuments({ college: collegeId });

//         // Calculate average rating
//         const ratingStats = await Review.aggregate([
//             { $match: { college: mongoose.Types.ObjectId(collegeId) } },
//             {
//                 $group: {
//                     _id: '$college',
//                     averageRating: { $avg: '$rating' },
//                     totalReviews: { $sum: 1 },
//                     ratingDistribution: {
//                         $push: '$rating'
//                     }
//                 }
//             }
//         ]);

//         res.json({
//             success: true,
//             count: reviews.length,
//             total,
//             pages: Math.ceil(total / limit),
//             currentPage: parseInt(page),
//             averageRating: ratingStats[0]?.averageRating || 0,
//             totalReviews: ratingStats[0]?.totalReviews || 0,
//             data: reviews
//         });
//     } catch (error) {
//         console.error('Get reviews by college error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error while fetching college reviews'
//         });
//     }
// };

// @desc    Get reviews by college ID
// @route   GET /api/reviews/college/:collegeId
// @access  Public
exports.getReviewsByCollege = async (req, res, next) => {
    try {
        const { collegeId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const reviews = await Review.find({ college: collegeId })
            .populate("college", "name image location")
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Review.countDocuments({ college: collegeId });

        // Calculate average rating
        const ratingStats = await Review.aggregate([
            { $match: { college: new mongoose.Types.ObjectId(collegeId) } },
            {
                $group: {
                    _id: "$college",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 },
                    ratingDistribution: { $push: "$rating" },
                },
            },
        ]);

        res.json({
            success: true,
            count: reviews.length,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            averageRating: ratingStats[0]?.averageRating || 0,
            totalReviews: ratingStats[0]?.totalReviews || 0,
            data: reviews,
        });
    } catch (error) {
        console.error("Get reviews by college error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching college reviews",
        });
    }
};


// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Public
exports.updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Update fields
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save();
        await review.populate('college', 'name image location rating established');

        res.json({
            success: true,
            message: 'Review updated successfully',
            data: review
        });
    } catch (error) {
        console.error('Update review error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating review'
        });
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Public
exports.deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        await Review.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Review deleted successfully',
            data: {}
        });
    } catch (error) {
        console.error('Delete review error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting review'
        });
    }
};