// src/Pages/MyCollege/MyCollege.jsx
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';

const MyCollege = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('admissions');
    const [showReviewForm, setShowReviewForm] = useState(false);

    // Mock data - replace with actual data from your backend
    const admissions = [
        {
            id: 1,
            collegeId: 1,
            collegeName: "University of Technology",
            collegeImage: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            applicationDate: "2024-01-15",
            status: "Under Review",
            candidateName: "John Doe",
            subject: "Computer Science",
            email: "john.doe@email.com",
            phone: "+1 234 567 8900",
            address: "123 Main St, New York, NY",
            dateOfBirth: "2000-05-15",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
        }
    ];

    const reviews = [
        {
            id: 1,
            collegeName: "University of Technology",
            rating: 5,
            comment: "Excellent faculty and state-of-the-art facilities. The research opportunities here are amazing!",
            date: "2024-01-15",
            likes: 12
        }
    ];

    const statusColors = {
        "Under Review": "bg-yellow-100 text-yellow-800",
        "Accepted": "bg-green-100 text-green-800",
        "Rejected": "bg-red-100 text-red-800",
        "Waitlisted": "bg-blue-100 text-blue-800"
    };

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
                            <div className="text-2xl font-bold text-blue-600">{admissions.length}</div>
                            <div className="text-gray-600">Applications</div>
                        </div>
                    </div>
                </div>

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
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                        Apply to New College
                                    </button>
                                </div>

                                {admissions.length > 0 ? (
                                    <div className="space-y-6">
                                        {admissions.map(application => (
                                            <div key={application.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                                                        <img
                                                            src={application.collegeImage}
                                                            alt={application.collegeName}
                                                            className="w-16 h-16 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <h3 className="text-xl font-semibold text-gray-800">
                                                                {application.collegeName}
                                                            </h3>
                                                            <p className="text-gray-600">Applied on {new Date(application.applicationDate).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[application.status]}`}>
                                                            {application.status}
                                                        </span>
                                                        <button
                                                            onClick={() => setShowReviewForm(true)}
                                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                                                        >
                                                            Add Review
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Application Details */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Candidate Name</label>
                                                        <p className="text-gray-800">{application.candidateName}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Subject</label>
                                                        <p className="text-gray-800">{application.subject}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Email</label>
                                                        <p className="text-gray-800">{application.email}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Phone</label>
                                                        <p className="text-gray-800">{application.phone}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                                                        <p className="text-gray-800">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Address</label>
                                                        <p className="text-gray-800">{application.address}</p>
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
                                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
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
                                    >
                                        Write New Review
                                    </button>
                                </div>

                                {reviews.length > 0 ? (
                                    <div className="space-y-6">
                                        {reviews.map(review => (
                                            <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-800">{review.collegeName}</h3>
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
                                                        {new Date(review.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-4">{review.comment}</p>
                                                <div className="flex justify-between items-center">
                                                    <button className="text-gray-400 hover:text-blue-500 transition-colors flex items-center space-x-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                        </svg>
                                                        <span className="text-sm">{review.likes} people found this helpful</span>
                                                    </button>
                                                    <div className="flex space-x-2">
                                                        <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                                                            Edit
                                                        </button>
                                                        <button className="text-red-500 hover:text-red-600 text-sm font-medium">
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
                                        <p className="text-gray-500 mb-6">Share your experience by reviewing colleges you've applied to</p>
                                        <button 
                                            onClick={() => setShowReviewForm(true)}
                                            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            Write Your First Review
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="text-2xl font-bold text-blue-600">{admissions.length}</div>
                        <div className="text-gray-600">Applications Submitted</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="text-2xl font-bold text-green-600">{reviews.length}</div>
                        <div className="text-gray-600">Reviews Written</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="text-2xl font-bold text-purple-600">{admissions.filter(app => app.status === 'Accepted').length}</div>
                        <div className="text-gray-600">Accepted Applications</div>
                    </div>
                </div>
            </div>

            {/* Review Form Modal */}
            {showReviewForm && (
                <ReviewForm
                    onClose={() => setShowReviewForm(false)}
                    onSubmit={(reviewData) => {
                        // Handle review submission
                        console.log('New review:', reviewData);
                        setShowReviewForm(false);
                    }}
                    colleges={admissions.map(app => app.collegeName)}
                />
            )}
        </div>
    );
};

export default MyCollege;