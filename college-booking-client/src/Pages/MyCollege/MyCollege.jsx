
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import { Link } from 'react-router-dom';

const MyCollege = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('admissions');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [admissions, setAdmissions] = useState([]);
    const [applicationSummary, setApplicationSummary] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reviewError, setReviewError] = useState(null);

    // Fetch user's applications and summary
    useEffect(() => {
        const fetchUserApplications = async () => {
            try {
                setLoading(true);
                const email = user?.email;

                if (!email) {
                    setError('User email not found');
                    setLoading(false);
                    return;
                }

                // Fetch application summary
                const summaryRes = await fetch(`https://college-booking-application.vercel.app/api/admissions/applied-summary/${email}`);
                const summaryData = await summaryRes.json();

                // Fetch detailed applied colleges
                const appliedRes = await fetch(`https://college-booking-application.vercel.app/api/admissions/applied-by-email/${email}`);
                const appliedData = await appliedRes.json();

                if (summaryData.success) {
                    setApplicationSummary(summaryData.data);
                }

                if (appliedData.success) {
                    // Transform the API response to include application date and other details
                    const transformedAdmissions = appliedData.data.map((college, index) => ({
                        id: college._id || `app-${index}`,
                        collegeId: college._id,
                        collegeName: college.name,
                        collegeImage: college.image,
                        collegeLocation: college.location,
                        collegeRating: college.rating,
                        collegeEstablished: college.established,
                        collegeResearchCount: college.researchCount,
                        applicationDate: new Date().toISOString().split('T')[0],
                        status: "Under Review",
                        candidateName: user?.displayName || "Student",
                        subject: "Computer Science",
                        email: user?.email,
                        phone: "+1 234 567 8900",
                        address: "123 Main St, City, State",
                        dateOfBirth: "2000-01-01",
                        image: user?.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                    }));
                    setAdmissions(transformedAdmissions);
                } else {
                    setAdmissions([]);
                }

            } catch (error) {
                console.error("Error fetching user applications:", error);
                setError('Failed to load applications');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserApplications();
        }
    }, [user]);

    // Fetch user's reviews
    const fetchUserReviews = async () => {
        try {
            setReviewsLoading(true);
            setReviewError(null);
            
            const email = user?.email;
            if (!email) return;

            const response = await fetch(`https://college-booking-application.vercel.app/api/reviews/user/${email}`);
            const data = await response.json();

            if (data.success) {
                setReviews(data.data);
            } else {
                setReviewError('Failed to load reviews');
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviewError('Failed to load reviews');
        } finally {
            setReviewsLoading(false);
        }
    };

    // Fetch reviews when reviews tab is active
    useEffect(() => {
        if (activeTab === 'reviews' && user?.email) {
            fetchUserReviews();
        }
    }, [activeTab, user]);

    const statusColors = {
        "Under Review": "bg-yellow-100 text-yellow-800",
        "Accepted": "bg-green-100 text-green-800",
        "Rejected": "bg-red-100 text-red-800",
        "Waitlisted": "bg-blue-100 text-blue-800"
    };

    const handleBrowseColleges = () => {
        window.location.href = '/colleges';
    };

    const handleApplyToNewCollege = () => {
        window.location.href = '/colleges';
    };

    const handleAddReview = (college) => {
        setSelectedCollege(college);
        setShowReviewForm(true);
    };

    const handleSubmitReview = async (reviewData) => {
        try {
            setReviewError(null);
            
            const reviewPayload = {
                email: user?.email,
                college: selectedCollege.collegeId,
                rating: reviewData.rating,
                comment: reviewData.comment
            };

            const response = await fetch('https://college-booking-application.vercel.app/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewPayload)
            });

            const data = await response.json();

            if (data.success) {
                // Refresh reviews list
                await fetchUserReviews();
                setShowReviewForm(false);
                setSelectedCollege(null);
                
                // Show success message
                alert('Review submitted successfully!');
            } else {
                setReviewError(data.message || 'Failed to submit review');
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setReviewError('Failed to submit review');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) {
            return;
        }

        try {
            const response = await fetch(`https://college-booking-application.vercel.app/api/reviews/${reviewId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.success) {
                // Refresh reviews list
                await fetchUserReviews();
                alert('Review deleted successfully!');
            } else {
                setReviewError('Failed to delete review');
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            setReviewError('Failed to delete review');
        }
    };

    const handleEditReview = (review) => {
        setSelectedCollege({
            collegeId: review.college?._id || review.collegeId,
            collegeName: review.college?.name || review.collegeName
        });
        setShowReviewForm(true);
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center py-16">
                        <svg className="w-24 h-24 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">Error Loading Applications</h3>
                        <p className="text-gray-500 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                            <img
                                src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"}
                                alt={user?.displayName || "User"}
                                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                            />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Welcome back, {user?.displayName || "Student"}!
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Manage your college applications and reviews
                                </p>
                            </div>
                        </div>
                        <div className="text-center lg:text-right">
                            <div className="text-2xl font-bold text-blue-600">
                                {applicationSummary?.totalApplications || admissions.length}
                            </div>
                            <div className="text-gray-600">Applications</div>
                        </div>
                    </div>
                </div>

                {/* Application Summary Cards */}
                {applicationSummary && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-2xl font-bold text-blue-600">{applicationSummary.totalApplications}</div>
                            <div className="text-gray-600">Total Applications</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-2xl font-bold text-green-600">{applicationSummary.appliedCollegesCount}</div>
                            <div className="text-gray-600">Colleges Applied</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-2xl font-bold text-yellow-600">{applicationSummary.statusCounts.pending}</div>
                            <div className="text-gray-600">Pending</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-2xl font-bold text-purple-600">{reviews.length}</div>
                            <div className="text-gray-600">Reviews Written</div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'admissions', name: 'My Applications', count: admissions.length },
                                { id: 'reviews', name: 'My Reviews', count: reviews.length }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.name}
                                    {tab.count > 0 && (
                                        <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Admissions Tab */}
                        {activeTab === 'admissions' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">My Applications</h2>
                                    <button 
                                        onClick={handleApplyToNewCollege}
                                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Apply to New College
                                    </button>
                                </div>

                                {admissions.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {admissions.map(application => (
                                            <div key={application.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                                {/* College Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <img 
                                                        src={application.collegeImage} 
                                                        alt={application.collegeName}
                                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                    />
                                                    {/* Applied Badge */}
                                                    <div className="absolute top-4 right-4">
                                                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                            Applied
                                                        </span>
                                                    </div>
                                                    {/* Status Badge */}
                                                    <div className="absolute top-4 left-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                                                            {application.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* College Content */}
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{application.collegeName}</h3>
                                                    <p className="text-gray-600 mb-3">{application.collegeLocation}</p>
                                                    
                                                    {/* College Details */}
                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex justify-between text-sm text-gray-600">
                                                            <span>Rating:</span>
                                                            <div className="flex items-center">
                                                                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                <span className="font-medium">{application.collegeRating}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between text-sm text-gray-600">
                                                            <span>Established:</span>
                                                            <span className="font-medium">{application.collegeEstablished}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm text-gray-600">
                                                            <span>Research Papers:</span>
                                                            <span className="font-medium">{application.collegeResearchCount}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm text-gray-600">
                                                            <span>Applied Date:</span>
                                                            <span className="font-medium text-blue-600">
                                                                {new Date(application.applicationDate).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex space-x-3 mt-6">
                                                        <button
                                                            onClick={() => handleAddReview(application)}
                                                            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Add Review
                                                        </button>
                                                        <Link
                                                            to={`/colleges/${application.collegeId}`}
                                                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium flex items-center justify-center"
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            View College
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No applications yet</h3>
                                        <p className="text-gray-500 mb-6">Start your college journey by applying to your dream colleges</p>
                                        <button 
                                            onClick={handleBrowseColleges}
                                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            Browse Colleges
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">My Reviews</h2>
                                    <button 
                                        onClick={() => setShowReviewForm(true)}
                                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                        disabled={admissions.length === 0}
                                    >
                                        Write New Review
                                    </button>
                                </div>

                                {/* Error Message */}
                                {reviewError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                        {reviewError}
                                    </div>
                                )}

                                {reviewsLoading ? (
                                    <div className="flex justify-center items-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                                    </div>
                                ) : reviews.length > 0 ? (
                                    <div className="space-y-6">
                                        {reviews.map(review => (
                                            <div key={review._id} className="bg-white border border-gray-200 rounded-xl p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-800">
                                                            {review.college?.name || 'College'}
                                                        </h3>
                                                        <div className="flex items-center space-x-1 mt-1">
                                                            {Array.from({ length: 5 }, (_, index) => (
                                                                <svg
                                                                    key={index}
                                                                    className={`w-5 h-5 ${index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                            <span className="text-gray-500 ml-2">({review.rating}.0)</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-4">{review.comment}</p>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                        {review.isVerified && (
                                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                                Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button 
                                                            onClick={() => handleEditReview(review)}
                                                            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteReview(review._id)}
                                                            className="text-red-500 hover:text-red-600 text-sm font-medium"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No reviews yet</h3>
                                        <p className="text-gray-500 mb-6">
                                            {admissions.length === 0 
                                                ? "Apply to colleges first to write reviews" 
                                                : "Share your experience by reviewing colleges you've applied to"
                                            }
                                        </p>
                                        {admissions.length > 0 ? (
                                            <button 
                                                onClick={() => setShowReviewForm(true)}
                                                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                                            >
                                                Write Your First Review
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={handleBrowseColleges}
                                                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                Browse Colleges to Apply
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Review Form Modal - FIXED: Pass college names as array of strings */}
            {showReviewForm && (
                <ReviewForm
                    onClose={() => {
                        setShowReviewForm(false);
                        setSelectedCollege(null);
                        setReviewError(null);
                    }}
                    onSubmit={handleSubmitReview}
                    college={selectedCollege}
                    colleges={admissions.map(app => app.collegeName)} // Changed to array of strings
                    error={reviewError}
                />
            )}
        </div>
    );
};

export default MyCollege;