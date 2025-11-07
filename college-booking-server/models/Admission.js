// models/Admission.js
const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    college: {
        type: mongoose.Schema.ObjectId,
        ref: 'College',
        required: true
    },
    candidateName: {
        type: String,
        required: [true, 'Please add candidate name']
    },
    subject: {
        type: String,
        required: [true, 'Please add subject']
    },
    email: {
        type: String,
        required: [true, 'Please add email']
    },
    phone: {
        type: String,
        required: [true, 'Please add phone number']
    },
    address: {
        type: String,
        required: [true, 'Please add address']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please add date of birth']
    },
    image: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'under_review', 'accepted', 'rejected', 'waitlisted'],
        default: 'pending'
    },
    applicationDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Prevent duplicate applications
admissionSchema.index({ user: 1, college: 1 }, { unique: true });

module.exports = mongoose.model('Admission', admissionSchema);