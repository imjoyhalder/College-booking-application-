
const Admission = require('../models/Admission');
const College = require('../models/College');

// @desc    Create admission application
// @route   POST /api/admissions
// @access  Private
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


exports.getAppliedCollegesByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Step 1: Find all admissions for this email
        const admissions = await Admission.find({ email: email.toLowerCase() }).select("college");

        if (admissions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No college applications found for this email",
                data: []
            });
        }

        // Step 2: Extract unique college IDs
        const collegeIds = [...new Set(admissions.map(a => a.college.toString()))];

        // Step 3: Fetch the college details
        const colleges = await College.find({ _id: { $in: collegeIds } })
            .select("name image location rating established researchCount description");

        res.status(200).json({
            success: true,
            count: colleges.length,
            data: colleges
        });

    } catch (error) {
        console.error("Error fetching applied colleges:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// for future uses
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


exports.getAppliedCollegesSummary = async (req, res, next) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Get admission counts by status
        const statusCounts = await Admission.aggregate([
            { $match: { email: email.toLowerCase() } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get total applications count
        const totalApplications = await Admission.countDocuments({ email: email.toLowerCase() });

        // Get applied colleges count
        const appliedColleges = await Admission.distinct('college', { email: email.toLowerCase() });

        res.json({
            success: true,
            data: {
                totalApplications,
                appliedCollegesCount: appliedColleges.length,
                statusCounts: statusCounts.reduce((acc, curr) => {
                    acc[curr._id] = curr.count;
                    return acc;
                }, {}),
                email: email
            }
        });
    } catch (error) {
        console.error('Get applied colleges summary error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};