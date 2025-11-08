// routes/admissions.js
const express = require('express');
const { 
    createAdmission, 
    getAdmissions, 
    getAppliedCollegesSummary,
    getAppliedCollegesByEmail
} = require('../controllers/admissionController');


const router = express.Router();

router.post('/', createAdmission);
// router.get('/my-admissions', getAdmissionsByEmail);

// create for after use
router.get('/', getAdmissions); // Admin only
// router.put('/:id', protect, authorize('admin'), updateAdmission); // Admin only

router.get('/applied-by-email/:email',getAppliedCollegesByEmail );
router.get('/applied-summary/:email', getAppliedCollegesSummary);

module.exports = router;