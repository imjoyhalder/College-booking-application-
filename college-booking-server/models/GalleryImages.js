// models/GalleryImage.js (Simplified version)
const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Graduation',
            'Campus Life', 
            'Research',
            'Sports',
            'Facilities',
            'Events',
            'Academics',
            'Student Life'
        ]
    },
}, {
    timestamps: true
});



const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

module.exports = GalleryImage;