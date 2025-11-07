// src/Components/ReviewForm/ReviewForm.jsx
import { useState } from 'react';

const ReviewForm = ({ onClose, onSubmit, colleges }) => {
    const [formData, setFormData] = useState({
        college: '',
        rating: 5,
        comment: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.college && formData.comment) {
            onSubmit(formData);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <button
                key={index}
                type="button"
                onClick={() => setFormData({ ...formData, rating: index + 1 })}
                className="text-2xl focus:outline-none"
            >
                {index < formData.rating ? '⭐' : '☆'}
            </button>
        ));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Add Your Review</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* College Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select College *
                            </label>
                            <select
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Choose a college</option>
                                {colleges.map(college => (
                                    <option key={college} value={college}>{college}</option>
                                ))}
                            </select>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Rating *
                            </label>
                            <div className="flex items-center space-x-2">
                                {renderStars()}
                                <span className="text-lg font-semibold text-gray-700 ml-2">
                                    {formData.rating}.0
                                </span>
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Review *
                            </label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Share your experience with this college..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Minimum 50 characters. Current: {formData.comment.length}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!formData.college || !formData.comment || formData.comment.length < 50}
                                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Review
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;