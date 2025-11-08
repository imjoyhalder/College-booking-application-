// controllers/admissionController.js
const Admission = require('../models/Admission');
const College = require('../models/College');

// @desc    Create admission application
// @route   POST /api/admissions
// @access  Private
// exports.createAdmission = async (req, res, next) => {
//     try {
//         // Add user to req.body
//         req.body.user = req.user.id;

//         console.log('Received admission data:', req.body);

//         // Check if college exists
//         const college = await College.findById(req.body.college);
//         if (!college) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'College not found'
//             });
//         }

//         // Check if already applied
//         const existingApplication = await Admission.findOne({
//             user: req.user.id,
//             college: req.body.college
//         });

//         if (existingApplication) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Already applied to this college'
//             });
//         }

//         // Create admission with all required fields
//         const admissionData = {
//             user: req.user.id,
//             college: req.body.college,
//             candidateName: req.body.candidateName,
//             subject: req.body.subject,
//             email: req.body.email,
//             phone: req.body.phone,
//             address: req.body.address,
//             dateOfBirth: req.body.dateOfBirth,
//             // image is optional, will use default if not provided
//             image: req.body.image || ''
//         };

//         const admission = await Admission.create(admissionData);

//         res.status(201).json({
//             success: true,
//             data: admission,
//             message: 'Application submitted successfully'
//         });
//     } catch (error) {
//         console.error('Admission creation error:', error);
        
//         // Handle duplicate key error
//         if (error.code === 11000) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Already applied to this college'
//             });
//         }
        
//         // Handle validation errors
//         if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map(val => val.message);
//             return res.status(400).json({
//                 success: false,
//                 message: messages.join(', ')
//             });
//         }

//         res.status(500).json({
//             success: false,
//             message: 'Server error'
//         });
//     }
// };

exports.createAdmission = async (req, res, next) => {
    try {
        const {
            user, 
            college,
            candidateName,
            subject,
            email,
            phone,
            address,
            dateOfBirth,
            image
        } = req.body;

        if (!user || !college || !candidateName || !subject || !email || !phone || !address || !dateOfBirth) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Check if college exists
        const collegeExists = await College.findById(college);
        if (!collegeExists) {
            return res.status(404).json({
                success: false,
                message: 'College not found'
            });
        }

        // Check if already applied
        const existingApplication = await Admission.findOne({
            user,
            college
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: 'Already applied to this college'
            });
        }

        const admissionData = {
            user,
            college,
            candidateName,
            subject,
            email,
            phone,
            address,
            dateOfBirth,
            image: image || ''
        };

        const admission = await Admission.create(admissionData);

        res.status(201).json({
            success: true,
            data: admission,
            message: 'Application submitted successfully'
        });
    } catch (error) {
        console.error('Admission creation error:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Already applied to this college'
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get user admissions
// @route   GET /api/admissions/my-admissions
// @access  Private
exports.getMyAdmissions = async (req, res, next) => {
    try {
        const admissions = await Admission.find({ user: req.user.id })
            .populate('college', 'name image location rating admissionDates')
            .sort({ applicationDate: -1 });

        res.json({
            success: true,
            count: admissions.length,
            data: admissions
        });
    } catch (error) {
        console.error('Get admissions error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get all admissions (for admin)
// @route   GET /api/admissions
// @access  Private/Admin
exports.getAdmissions = async (req, res, next) => {
    try {
        const admissions = await Admission.find()
            .populate('user', 'name email')
            .populate('college', 'name location')
            .sort({ applicationDate: -1 });

        res.json({
            success: true,
            count: admissions.length,
            data: admissions
        });
    } catch (error) {
        console.error('Get all admissions error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Update admission status
// @route   PUT /api/admissions/:id
// @access  Private/Admin
exports.updateAdmission = async (req, res, next) => {
    try {
        const { status } = req.body;
        
        const admission = await Admission.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        ).populate('college', 'name').populate('user', 'name email');

        if (!admission) {
            return res.status(404).json({
                success: false,
                message: 'Admission not found'
            });
        }

        res.json({
            success: true,
            data: admission,
            message: 'Admission status updated successfully'
        });
    } catch (error) {
        console.error('Update admission error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};