
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { 
    FaSearch, 
    FaMapMarkerAlt, 
    FaStar, 
    FaCalendarAlt, 
    FaGraduationCap,
    FaUniversity,
    FaUser,
    FaPhone,
    FaEnvelope,
    FaHome,
    FaBirthdayCake,
    FaBook,
    FaArrowLeft,
    FaCheckCircle
} from 'react-icons/fa';

const Admission = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [colleges, setColleges] = useState([]);
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState('all');
    const [sortBy, setSortBy] = useState('name');

    const [formData, setFormData] = useState({
        applicantName: user?.displayName || '',
        subject: '',
        email: user?.email || '',
        phone: '',
        address: '',
        dateOfBirth: '',
        image: null
    });

    // Fetch colleges from API
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://college-booking-application.vercel.app/api/colleges');
                const data = await res.json();
                if (data.success) {
                    setColleges(data.data || []);
                    setFilteredColleges(data.data || []);
                } else {
                    setError('Failed to fetch colleges');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to connect to server');
            } finally {
                setLoading(false);
            }
        };
        fetchColleges();
    }, []);

    // Filter and sort colleges
    useEffect(() => {
        let filtered = colleges.filter(college => {
            const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                college.location.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesRating = selectedRating === 'all' ||
                (selectedRating === '4.5+' && college.rating >= 4.5) ||
                (selectedRating === '4.0+' && college.rating >= 4.0) ||
                (selectedRating === '3.5+' && college.rating >= 3.5);
            
            return matchesSearch && matchesRating;
        });

        // Sort colleges
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'rating':
                    return b.rating - a.rating;
                case 'research':
                    return b.researchCount - a.researchCount;
                case 'established':
                    return b.established - a.established;
                default:
                    return 0;
            }
        });

        setFilteredColleges(filtered);
    }, [colleges, searchTerm, selectedRating, sortBy]);

    const handleCollegeSelect = (college) => {
        setSelectedCollege(college);
        setShowForm(true);
        // Pre-fill form with user data
        setFormData(prev => ({
            ...prev,
            applicantName: user?.displayName || prev.applicantName,
            email: user?.email || prev.email
        }));
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData(prev => ({ ...prev, image: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['applicantName', 'subject', 'phone', 'address', 'dateOfBirth'];
        const missingFields = requiredFields.filter(f => !formData[f]);
        if (missingFields.length > 0) {
            alert(`Please fill all required fields: ${missingFields.join(', ')}`);
            return;
        }

        if (!selectedCollege || !selectedCollege._id) {
            alert('College information missing.');
            return;
        }

        setSubmitting(true);

        try {
            const admissionData = {
                user: formData.email || formData.applicantName,
                college: selectedCollege._id,
                candidateName: formData.applicantName,
                subject: formData.subject,
                email: user.email,
                phone: formData.phone,
                address: formData.address,
                dateOfBirth: formData.dateOfBirth
            };

            console.log('Submitting:', admissionData);

            const response = await fetch('https://college-booking-application.vercel.app/api/admissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(admissionData)
            });

            const result = await response.json();
            console.log('Server response:', result);

            if (result.success) {
                alert('Application submitted successfully!');
                setShowForm(false);
                setSelectedCollege(null);
                setFormData({
                    applicantName: user?.displayName || '',
                    subject: '',
                    email: user?.email || '',
                    phone: '',
                    address: '',
                    dateOfBirth: '',
                    image: null
                });
                navigate('/my-college');
            } else {
                alert(result.message || 'Failed to submit.');
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting application.');
        } finally {
            setSubmitting(false);
        }
    };

    const getCollegePrograms = (college) => {
        const defaultPrograms = [
            "Computer Science", "Computer Engineering", "Software Engineering",
            "Business Administration", "Economics", "Finance",
            "Mechanical Engineering", "Electrical Engineering", "Civil Engineering",
            "Medicine", "Biology", "Chemistry", "Physics",
            "Law", "Political Science", "International Relations",
            "Architecture", "Urban Planning", "Interior Design",
            "Psychology", "Sociology", "Anthropology",
            "English Literature", "History", "Philosophy"
        ];
        return college?.programs || defaultPrograms;
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedRating('all');
        setSortBy('name');
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading colleges...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Colleges</h3>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showForm && selectedCollege) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                                    disabled={submitting}
                                >
                                    <FaArrowLeft className="w-5 h-5" />
                                    <span>Back to Colleges</span>
                                </button>
                                <div className="text-right">
                                    <h1 className="text-3xl font-bold text-gray-800">Application Form</h1>
                                    <p className="text-gray-600">Complete your application for</p>
                                </div>
                            </div>

                            {/* College Info Card */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={selectedCollege.image}
                                        alt={selectedCollege.name}
                                        className="w-20 h-20 rounded-xl object-cover border-4 border-white/20"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold mb-2">{selectedCollege.name}</h2>
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center space-x-1">
                                                <FaMapMarkerAlt className="w-4 h-4" />
                                                <span>{selectedCollege.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <FaStar className="w-4 h-4 text-yellow-300" />
                                                <span>{selectedCollege.rating}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <FaCalendarAlt className="w-4 h-4" />
                                                <span>Est. {selectedCollege.established}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Application Form */}
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Personal Information Section */}
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <FaUser className="w-5 h-5 mr-2 text-blue-600" />
                                        Personal Information
                                    </h3>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <FaUser className="w-4 h-4" />
                                        <span>Full Name *</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="applicantName"
                                        value={formData.applicantName}
                                        onChange={handleInputChange}
                                        required
                                        disabled={submitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <FaEnvelope className="w-4 h-4" />
                                        <span>Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                        placeholder="Your email address"
                                    />
                                    <p className="text-xs text-gray-500">Email is taken from your profile</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <FaPhone className="w-4 h-4" />
                                        <span>Phone Number *</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        disabled={submitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                                        placeholder="+88017246"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <FaBirthdayCake className="w-4 h-4" />
                                        <span>Date of Birth *</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        required
                                        disabled={submitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <FaHome className="w-4 h-4" />
                                        <span>Address *</span>
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        disabled={submitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 disabled:bg-gray-100"
                                        placeholder="Enter your complete address"
                                    />
                                </div>

                                {/* Academic Information Section */}
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <FaBook className="w-5 h-5 mr-2 text-green-600" />
                                        Academic Information
                                    </h3>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                        <FaGraduationCap className="w-4 h-4" />
                                        <span>Desired Program *</span>
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        disabled={submitting}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                                    >
                                        <option value="">Select your desired program</option>
                                        {getCollegePrograms(selectedCollege).map(program => (
                                            <option key={program} value={program}>{program}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex space-x-4 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    disabled={submitting}
                                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    <span>Cancel</span>
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaCheckCircle className="w-5 h-5" />
                                            <span>Submit Application</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        College Admission
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover and apply to your dream colleges with our streamlined admission process
                    </p>
                </div>

                {/* Search and Filters Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Colleges
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by name or location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <FaSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum Rating
                            </label>
                            <select
                                value={selectedRating}
                                onChange={(e) => setSelectedRating(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Ratings</option>
                                <option value="4.5+">4.5+ Stars</option>
                                <option value="4.0+">4.0+ Stars</option>
                                <option value="3.5+">3.5+ Stars</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="name">Name</option>
                                <option value="rating">Rating</option>
                                <option value="research">Research</option>
                                <option value="established">Established</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count and Reset */}
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                        <p className="text-gray-600">
                            Showing {filteredColleges.length} of {colleges.length} colleges
                        </p>
                        <button
                            onClick={resetFilters}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
                        >
                            <span>Reset Filters</span>
                        </button>
                    </div>
                </div>

                {/* Colleges Grid */}
                {filteredColleges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {filteredColleges.map(college => (
                            <div key={college._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="relative">
                                    <img
                                        src={college.image}
                                        alt={college.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                                            <FaStar className="w-4 h-4" />
                                            <span>{college.rating}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{college.name}</h3>
                                    <p className="text-gray-600 mb-3">{college.admissionDates}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm">{college.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <FaUniversity className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm">Est. {college.established}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <FaGraduationCap className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm">{college.researchCount} Research Papers</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleCollegeSelect(college)}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaUniversity className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Colleges Found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
                        <button
                            onClick={resetFilters}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Application Process */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Simple Application Process
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { step: 1, title: "Browse Colleges", desc: "Explore available institutions", icon: FaUniversity },
                            { step: 2, title: "Select Program", desc: "Choose your desired course", icon: FaGraduationCap },
                            { step: 3, title: "Fill Form", desc: "Complete application details", icon: FaUser },
                            { step: 4, title: "Submit", desc: "Review and submit application", icon: FaCheckCircle }
                        ].map(step => {
                            const IconComponent = step.icon;
                            return (
                                <div key={step.step} className="text-center group">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold -mt-4 mx-auto mb-2">
                                        {step.step}
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                                    <p className="text-gray-600 text-sm">{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admission;
