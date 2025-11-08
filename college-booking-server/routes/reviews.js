// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const {
    createReview,
    getAllReviews,
    getReviewsByEmail,
    getReviewsByCollege,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

// Public routes
router.post('/', createReview);
router.get('/', getAllReviews);
router.get('/user/:email', getReviewsByEmail);
router.get('/college/:collegeId', getReviewsByCollege);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;