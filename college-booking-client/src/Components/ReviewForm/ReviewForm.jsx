// // src/Components/ReviewForm/ReviewForm.jsx
// import { useState } from 'react';

// const ReviewForm = ({ onClose, onSubmit, colleges }) => {
//     const [formData, setFormData] = useState({
//         college: '',
//         rating: 5,
//         comment: ''
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (formData.college && formData.comment) {
//             onSubmit(formData);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const renderStars = () => {
//         return Array.from({ length: 5 }, (_, index) => (
//             <button
//                 key={index}
//                 type="button"
//                 onClick={() => setFormData({ ...formData, rating: index + 1 })}
//                 className="text-2xl focus:outline-none"
//             >
//                 {index < formData.rating ? '⭐' : '☆'}
//             </button>
//         ));
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//                 <div className="p-6">
//                     {/* Header */}
//                     <div className="flex justify-between items-center mb-6">
//                         <h3 className="text-xl font-bold text-gray-800">Add Your Review</h3>
//                         <button
//                             onClick={onClose}
//                             className="text-gray-400 hover:text-gray-600 transition-colors"
//                         >
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Form */}
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* College Selection */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Select College *
//                             </label>
//                             <select
//                                 name="college"
//                                 value={formData.college}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             >
//                                 <option value="">Choose a college</option>
//                                 {colleges.map(college => (
//                                     <option key={college} value={college}>{college}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Rating */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Your Rating *
//                             </label>
//                             <div className="flex items-center space-x-2">
//                                 {renderStars()}
//                                 <span className="text-lg font-semibold text-gray-700 ml-2">
//                                     {formData.rating}.0
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Comment */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Your Review *
//                             </label>
//                             <textarea
//                                 name="comment"
//                                 value={formData.comment}
//                                 onChange={handleChange}
//                                 required
//                                 rows="4"
//                                 placeholder="Share your experience with this college..."
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                             />
//                             <p className="text-xs text-gray-500 mt-1">
//                                 Minimum 50 characters. Current: {formData.comment.length}
//                             </p>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex space-x-4 pt-4">
//                             <button
//                                 type="button"
//                                 onClick={onClose}
//                                 className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={!formData.college || !formData.comment || formData.comment.length < 50}
//                                 className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Submit Review
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ReviewForm;

import { useState } from 'react';
import { 
    FaStar, 
    FaRegStar, 
    FaTimes, 
    FaUniversity, 
    FaEdit, 
    FaQuoteLeft,
    FaCheckCircle,
    FaExclamationTriangle
} from 'react-icons/fa';

const ReviewForm = ({ onClose, onSubmit, college, colleges, error }) => {
    const [formData, setFormData] = useState({
        college: college?.collegeName || '',
        rating: 5,
        comment: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.college && formData.comment && formData.comment.length >= 50) {
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
                className={`transition-all duration-200 transform hover:scale-110 focus:outline-none ${
                    index < formData.rating 
                        ? 'text-yellow-400 hover:text-yellow-500' 
                        : 'text-gray-300 hover:text-gray-400'
                }`}
            >
                {index < formData.rating ? (
                    <FaStar className="w-8 h-8" />
                ) : (
                    <FaRegStar className="w-8 h-8" />
                )}
            </button>
        ));
    };

    const getRatingText = (rating) => {
        const ratings = {
            1: "Poor",
            2: "Fair", 
            3: "Good",
            4: "Very Good",
            5: "Excellent"
        };
        return ratings[rating] || "Select Rating";
    };

    const isFormValid = formData.college && formData.comment && formData.comment.length >= 50;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 hover:scale-100">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <FaEdit className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Share Your Experience</h3>
                                <p className="text-blue-100 text-sm">Help others make informed decisions</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                            <FaExclamationTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* College Selection */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                                <FaUniversity className="w-4 h-4 text-blue-600" />
                                <span>Select College *</span>
                            </label>
                            <select
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                required
                                disabled={!!college} // Disable if college is pre-selected
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-600"
                            >
                                <option value="">Choose a college you've applied to</option>
                                {colleges.map((collegeItem, index) => (
                                    <option key={index} value={collegeItem}>
                                        {collegeItem}
                                    </option>
                                ))}
                            </select>
                            {college && (
                                <p className="text-xs text-green-600 flex items-center space-x-1">
                                    <FaCheckCircle className="w-3 h-3" />
                                    <span>Pre-selected from your applications</span>
                                </p>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="space-y-3">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                                <FaStar className="w-4 h-4 text-yellow-500" />
                                <span>Your Rating *</span>
                            </label>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex flex-col items-center space-y-3">
                                    <div className="flex items-center space-x-1">
                                        {renderStars()}
                                    </div>
                                    <div className="text-center">
                                        <span className="text-2xl font-bold text-gray-800">
                                            {formData.rating}.0
                                        </span>
                                        <span className="block text-sm text-gray-600 font-medium">
                                            {getRatingText(formData.rating)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                                <FaQuoteLeft className="w-4 h-4 text-purple-600" />
                                <span>Your Review *</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Share your honest experience with this college. Consider aspects like faculty, facilities, campus life, placement opportunities, etc. Minimum 50 characters required."
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none pr-20"
                                />
                                <div className={`absolute bottom-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${
                                    formData.comment.length >= 50 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {formData.comment.length}/50
                                </div>
                            </div>
                            {formData.comment.length > 0 && formData.comment.length < 50 && (
                                <p className="text-xs text-red-600 flex items-center space-x-1">
                                    <FaExclamationTriangle className="w-3 h-3" />
                                    <span>Please write at least 50 characters</span>
                                </p>
                            )}
                        </div>

                        {/* Form Validation Summary */}
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                            <h4 className="text-sm font-semibold text-blue-800 mb-2">Review Guidelines</h4>
                            <ul className="text-xs text-blue-700 space-y-1">
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                    <span>Be honest and specific about your experience</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                    <span>Focus on academics, facilities, and campus life</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <FaCheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                    <span>Avoid personal attacks or inappropriate language</span>
                                </li>
                            </ul>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 transform hover:scale-105 border-2 border-transparent hover:border-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                            >
                                <FaEdit className="w-4 h-4" />
                                <span>Submit Review</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;