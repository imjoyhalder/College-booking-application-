// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    college: {
        type: mongoose.Schema.ObjectId,
        ref: 'College',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating between 1 and 5'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Please add a comment'],
        maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Prevent duplicate reviews from same email for same college
reviewSchema.index({ email: 1, college: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);