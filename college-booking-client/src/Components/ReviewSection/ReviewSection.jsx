// src/Components/ReviewSection/ReviewSection.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import ReviewCard from '../ReviewCard/ReviewCard';
import ReviewForm from '../ReviewForm/ReviewForm';

const ReviewSection = () => {
    const { user } = useContext(AuthContext);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviews, setReviews] = useState([
        {
            id: 1,
            userName: "Sarah Johnson",
            userImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            college: "University of Technology",
            rating: 5,
            comment: "Excellent faculty and state-of-the-art facilities. The research opportunities here are amazing!",
            date: "2024-01-15",
            verified: true
        },
        {
            id: 2,
            userName: "Michael Chen",
            userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            college: "Cambridge University",
            rating: 4,
            comment: "Great campus life and international exposure. The sports facilities are top-notch.",
            date: "2024-01-10",
            verified: true
        },
        {
            id: 3,
            userName: "Emily Davis",
            userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            college: "Stanford University",
            rating: 5,
            comment: "The innovation and entrepreneurship programs are outstanding. Highly recommended for aspiring entrepreneurs!",
            date: "2024-01-08",
            verified: true
        },
        {
            id: 4,
            userName: "Robert Wilson",
            userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            college: "University of Technology",
            rating: 4,
            comment: "Good academic environment but could improve campus accommodation facilities.",
            date: "2024-01-05",
            verified: false
        },
        {
            id: 5,
            userName: "Lisa Martinez",
            userImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            college: "Cambridge University",
            rating: 5,
            comment: "The cultural diversity and international student community made my experience unforgettable!",
            date: "2024-01-03",
            verified: true
        },
        {
            id: 6,
            userName: "David Kim",
            userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            college: "Stanford University",
            rating: 4,
            comment: "Excellent research facilities and faculty support. The career services are very helpful.",
            date: "2024-01-01",
            verified: true
        }
    ]);

    const [filterCollege, setFilterCollege] = useState("All");
    const [sortBy, setSortBy] = useState("latest");

    // Get unique colleges for filter
    const colleges = ["All", ...new Set(reviews.map(review => review.college))];

    // Filter and sort reviews
    const filteredReviews = reviews
        .filter(review => filterCollege === "All" || review.college === filterCollege)
        .sort((a, b) => {
            if (sortBy === "latest") {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === "highest") {
                return b.rating - a.rating;
            } else {
                return a.rating - b.rating;
            }
        });

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : "0.0";

    const handleAddReview = (newReview) => {
        const review = {
            id: reviews.length + 1,
            userName: user.displayName || "Anonymous",
            userImage: user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
            college: newReview.college,
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split('T')[0],
            verified: true
        };
        setReviews([review, ...reviews]);
        setShowReviewForm(false);
    };

    return (
        <div className="w-full">
            {/* Header Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div className="text-center lg:text-left mb-6 lg:mb-0">
                        <h3 className="text-2xl font-bold mb-2">Student Reviews</h3>
                        <p className="text-blue-100">What our students say about their college experience</p>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold">{averageRating}</div>
                            <div className="text-blue-100 text-sm">Average Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">{reviews.length}</div>
                            <div className="text-blue-100 text-sm">Total Reviews</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">{colleges.length - 1}</div>
                            <div className="text-blue-100 text-sm">Colleges Reviewed</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* College Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by College
                        </label>
                        <select
                            value={filterCollege}
                            onChange={(e) => setFilterCollege(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {colleges.map(college => (
                                <option key={college} value={college}>{college}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort By */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sort by
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="latest">Latest First</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                        </select>
                    </div>
                </div>


            </div>

            {/* Reviews Grid */}
            {filteredReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-600">No reviews found</h3>
                    <p className="text-gray-500">Try selecting a different college or filter</p>
                </div>
            )}

            {/* Load More Button */}
            {filteredReviews.length > 6 && (
                <div className="text-center mt-8">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                        Load More Reviews
                    </button>
                </div>
            )}

            {/* Review Form Modal */}
            {showReviewForm && (
                <ReviewForm
                    onClose={() => setShowReviewForm(false)}
                    onSubmit={handleAddReview}
                    colleges={colleges.filter(c => c !== "All")}
                />
            )}
        </div>
    );
};

export default ReviewSection;