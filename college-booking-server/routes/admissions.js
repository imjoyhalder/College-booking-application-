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


// create for after use
router.get('/', getAdmissions); 


router.get('/applied-by-email/:email',getAppliedCollegesByEmail );
router.get('/applied-summary/:email', getAppliedCollegesSummary);

module.exports = router;