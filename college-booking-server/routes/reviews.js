// routes/reviews.js
const express = require('express');
const { createReview, getMyReviews } = require('../controllers/reviewController');


const router = express.Router();

router.post('/',createReview);
router.get('/my-reviews',  getMyReviews);

module.exports = router;