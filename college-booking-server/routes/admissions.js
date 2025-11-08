// routes/admissions.js
const express = require('express');
const { 
    createAdmission, 
    getMyAdmissions, 
    getAdmissions, 
    updateAdmission 
} = require('../controllers/admissionController');


const router = express.Router();

router.post('/', createAdmission);
router.get('/my-admissions', getMyAdmissions);

// create for after use
// router.get('/', protect, authorize('admin'), getAdmissions); // Admin only
// router.put('/:id', protect, authorize('admin'), updateAdmission); // Admin only

module.exports = router;