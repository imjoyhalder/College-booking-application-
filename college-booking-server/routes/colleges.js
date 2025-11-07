// routes/colleges.js
const express = require('express');
const { getColleges, getCollege, getCollegeReviews } = require('../controllers/collegeController');

const router = express.Router();

router.get('/', getColleges);
router.get('/:id', getCollege);
router.get('/:id/reviews', getCollegeReviews);

module.exports = router;