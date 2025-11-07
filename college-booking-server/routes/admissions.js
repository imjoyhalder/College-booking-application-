// routes/admissions.js
const express = require('express');
const { createAdmission, getMyAdmissions } = require('../controllers/admissionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createAdmission);
router.get('/my-admissions', protect, getMyAdmissions);

module.exports = router;