// controllers/admissionController.js
const Admission = require('../models/Admission');
const College = require('../models/College');

// @desc    Create admission application
// @route   POST /api/admissions
// @access  Private
exports.createAdmission = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.user = req.user.id;

        // Check if college exists
        const college = await College.findById(req.body.college);
        if (!college) {
            return res.status(404).json({
                success: false,
                message: 'College not found'
            });
        }

        // Check if already applied
        const existingApplication = await Admission.findOne({
            user: req.user.id,
            college: req.body.college
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'Already applied to this college'
            });
        }

        const admission = await Admission.create(req.body);

        res.status(201).json({
            success: true,
            data: admission
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user admissions
// @route   GET /api/admissions/my-admissions
// @access  Private
exports.getMyAdmissions = async (req, res, next) => {
    try {
        const admissions = await Admission.find({ user: req.user.id })
            .populate('college', 'name image location rating')
            .sort('-createdAt');

        res.json({
            success: true,
            count: admissions.length,
            data: admissions
        });
    } catch (error) {
        next(error);
    }
};