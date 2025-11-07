// src/Pages/Profile/Profile.jsx
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        email: user?.email || '',
        university: '',
        address: '',
        phone: '',
        bio: ''
    });

    // Mock user data - replace with actual data from your backend
    const [userData, setUserData] = useState({
        displayName: user?.displayName || 'John Doe',
        email: user?.email || 'john.doe@example.com',
        university: 'University of Technology',
        address: '123 Main Street, New York, NY 10001',
        phone: '+1 (555) 123-4567',
        bio: 'Passionate computer science student with interest in AI and machine learning. Looking forward to pursuing higher education at top universities.',
        joinDate: '2024-01-15',
        applications: 3,
        reviews: 2,
        savedColleges: 5
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update profile in Firebase
            await updateUserProfile(formData.displayName, user?.photoURL || '');

            // Update local state
            setUserData(prev => ({
                ...prev,
                ...formData
            }));

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            displayName: userData.displayName,
            email: userData.email,
            university: userData.university,
            address: userData.address,
            phone: userData.phone,
            bio: userData.bio
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                            <div className="relative">
                                <img
                                    src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"}
                                    alt={userData.displayName}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                                />
                                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {userData.displayName}
                                </h1>
                                <p className="text-gray-600 mt-1">{userData.email}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Member since {new Date(userData.joinDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Stats</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Applications', value: userData.applications, color: 'blue' },
                                    { label: 'Reviews', value: userData.reviews, color: 'green' },
                                    { label: 'Saved Colleges', value: userData.savedColleges, color: 'purple' }
                                ].map((stat, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-gray-600">{stat.label}</span>
                                        <span className={`font-semibold text-${stat.color}-600`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left text-gray-600 hover:text-blue-600 transition-colors py-2">
                                    Change Password
                                </button>
                                <button className="w-full text-left text-gray-600 hover:text-blue-600 transition-colors py-2">
                                    Notification Settings
                                </button>
                                <button className="w-full text-left text-gray-600 hover:text-blue-600 transition-colors py-2">
                                    Privacy Settings
                                </button>
                                <button className="w-full text-left text-red-600 hover:text-red-700 transition-colors py-2">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Profile Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            {isEditing ? (
                                <form onSubmit={handleSave} className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="displayName"
                                                value={formData.displayName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                University
                                            </label>
                                            <input
                                                type="text"
                                                name="university"
                                                value={formData.university}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Address
                                            </label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Bio
                                            </label>
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                rows="4"
                                                placeholder="Tell us about yourself..."
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex space-x-4 pt-6">
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Full Name
                                            </label>
                                            <p className="text-gray-800 font-medium">{userData.displayName}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Email Address
                                            </label>
                                            <p className="text-gray-800 font-medium">{userData.email}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                University
                                            </label>
                                            <p className="text-gray-800 font-medium">{userData.university || 'Not specified'}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Phone Number
                                            </label>
                                            <p className="text-gray-800 font-medium">{userData.phone || 'Not specified'}</p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Address
                                            </label>
                                            <p className="text-gray-800 font-medium">{userData.address || 'Not specified'}</p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Bio
                                            </label>
                                            <p className="text-gray-600 leading-relaxed">
                                                {userData.bio || 'No bio provided.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-200">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Account Verification</h4>
                                        <div className="flex items-center space-x-2 text-green-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>Email verified</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        action: 'Applied to University of Technology',
                                        date: '2024-01-15',
                                        type: 'application'
                                    },
                                    {
                                        action: 'Reviewed Cambridge University',
                                        date: '2024-01-12',
                                        type: 'review'
                                    },
                                    {
                                        action: 'Saved Stanford University',
                                        date: '2024-01-10',
                                        type: 'save'
                                    }
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                        <div className={`w-3 h-3 rounded-full ${
                                            activity.type === 'application' ? 'bg-blue-500' :
                                            activity.type === 'review' ? 'bg-green-500' : 'bg-purple-500'
                                        }`}></div>
                                        <div className="flex-1">
                                            <p className="text-gray-800">{activity.action}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(activity.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;