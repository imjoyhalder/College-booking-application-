// routes/reviews.js
const express = require('express');
const { createReview, getMyReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createReview);
router.get('/my-reviews', protect, getMyReviews);

module.exports = router;