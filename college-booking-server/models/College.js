
const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a college name'],
        unique: true,
        trim: true,
        maxlength: [100, 'College name cannot be more than 100 characters']
    },
    image: {
        type: String,
        required: [true, 'Please add a college image']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    established: {
        type: Number,
        required: [true, 'Please add establishment year']
    },
    students: {
        type: String,
        default: ''
    },
    faculty: {
        type: String,
        default: ''
    },
    campusSize: {
        type: String,
        default: ''
    },
    accreditation: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5'],
        default: 0
    },
    researchCount: {
        type: Number,
        default: 0
    },
    admissionDates: {
        type: String,
        required: [true, 'Please add admission dates']
    },
    events: [{
        name: String,
        date: Date,
        description: String
    }],
    sports: [{
        category: String,
        facilities: String,
        teams: String,
        achievements: String
    }],
    researchWorks: [String],
    admissionProcess: {
        type: String,
        required: [true, 'Please add admission process']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('College', collegeSchema);