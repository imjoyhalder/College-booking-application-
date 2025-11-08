
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';
import CollegeCard from '../../Components/CollegeCard/CollegeCard';
import Gallery from '../../Components/Gallery/Gallery';
import { FaUniversity, FaGraduationCap, FaStar, FaHeadset, FaQuoteLeft, FaCalendarAlt, FaUserGraduate, FaCheckCircle } from 'react-icons/fa';

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState([])
    const [featuredColleges, setFeaturedColleges] = useState([])
    const [loading, setLoading] = useState('')
    const [reviews, setReviews] = useState([])
    const [reviewsLoading, setReviewsLoading] = useState(true)

    // Fetch featured colleges
    useEffect(() => {
        const fetchColleges = async () => {
            try {
                setLoading(true);
                const res = await fetch('http://localhost:5000/api/colleges');
                const data = await res.json();

                if (data.success) {
                    setFeaturedColleges((data.data || []).slice(0, 3));
                } else {
                    setError('Failed to fetch colleges');
                }
            } catch (error) {
                console.error("Error fetching colleges:", error);
                setError('Failed to connect to server');
            } finally {
                setLoading(false);
            }
        };
        fetchColleges();
    }, []);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setReviewsLoading(true);
                const res = await fetch('http://localhost:5000/api/reviews?limit=6');
                const data = await res.json();

                if (data.success) {
                    setReviews(data.data || []);
                } else {
                    console.error('Failed to fetch reviews');
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setReviewsLoading(false);
            }
        };
        fetchReviews();
    }, []);

    console.log(featuredColleges);

    // Research papers data
    const researchPapers = [
        {
            id: 1,
            title: "Artificial Intelligence in Modern Education",
            link: "#",
            college: "University of Technology",
            authors: "Dr. Smith, Dr. Johnson",
            publishedDate: "2024-01-15",
            abstract: "Exploring the impact of AI technologies in transforming modern educational methodologies and learning experiences."
        },
        {
            id: 2,
            title: "Sustainable Energy Solutions for Urban Areas",
            link: "#",
            college: "Cambridge University",
            authors: "Prof. Wilson, Dr. Brown",
            publishedDate: "2024-01-10",
            abstract: "Innovative approaches to sustainable energy management in rapidly growing urban environments."
        },
        {
            id: 3,
            title: "Machine Learning Applications in Healthcare",
            link: "#",
            college: "Stanford University",
            authors: "Dr. Davis, Prof. Miller",
            publishedDate: "2024-01-08",
            abstract: "Revolutionizing healthcare diagnostics and treatment through advanced machine learning algorithms."
        }
    ];

    // Stats data with React Icons
    const stats = [
        { number: "50+", label: "Partner Colleges", icon: <FaUniversity className="text-3xl" /> },
        { number: "10K+", label: "Successful Admissions", icon: <FaGraduationCap className="text-3xl" /> },
        { number: "95%", label: "Student Satisfaction", icon: <FaStar className="text-3xl" /> },
        { number: "24/7", label: "Support Available", icon: <FaHeadset className="text-3xl" /> }
    ];

    // Handle search functionality
    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === '') {
            setShowSearchResults(false);
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setShowSearchResults(true);

        // Simulate API call delay
        setTimeout(() => {
            const results = featuredColleges.filter(college =>
                college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                college.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
            setIsLoading(false);
        }, 800);
    };

    // Clear search results
    const handleClearSearch = () => {
        setShowSearchResults(false);
        setSearchResults([]);
    };

    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen -mt-4">
            {/* Hero Section with Beautiful Background Image */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(37, 99, 235, 0.85) 0%, rgba(124, 58, 237, 0.8) 100%), url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                    }}
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white rounded-full animate-pulse"></div>
                        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white rounded-full animate-pulse delay-75"></div>
                        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-white rounded-full animate-pulse delay-150"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-pulse delay-300"></div>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto w-full">
                    {/* Main Heading */}
                    <div className="mb-8">
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 border mt-6 border-white/30">
                            <FaUniversity className="w-5 h-5 mr-2" />
                            Welcome to EduBook
                        </div>
                        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Find Your
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mt-4">
                                Dream College
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed font-light">
                            Discover the perfect educational institution that matches your aspirations
                            and sets you on the path to success
                        </p>
                    </div>

                    {/* Search Bar Section */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                            <h3 className="text-2xl font-semibold mb-6 text-white">
                                Search Among 50+ Premier Institutions
                            </h3>
                            <SearchBar onSearch={handleSearch} />
                            <p className="text-lg text-white/80 mt-4">
                                Search by college name, location, programs, or sports facilities
                            </p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 mb-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 group"
                            >
                                <div className="flex justify-center mb-3 transform group-hover:scale-110 transition-transform text-white">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-lg text-white/90 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Search Results Section */}
            {showSearchResults && (
                <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 border-b border-gray-200">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                                    Search Results
                                </h2>
                                <p className="text-gray-600">
                                    Found {searchResults.length} colleges matching your search
                                </p>
                            </div>
                            <button
                                onClick={handleClearSearch}
                                className="bg-white text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-gray-300 hover:border-gray-400 flex items-center space-x-2"
                            >
                                <span>Clear Search</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-16">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
                                <p className="text-gray-600 text-lg">Searching through our college database...</p>
                            </div>
                        ) : searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {searchResults.map(college => (
                                    <CollegeCard key={college.id} college={college} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
                                <svg className="w-20 h-20 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-2xl font-semibold text-gray-600 mb-4">No colleges found</h3>
                                <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                                    Try adjusting your search terms or browse our featured colleges below
                                </p>
                                <button
                                    onClick={handleClearSearch}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Browse Featured Colleges
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Featured Colleges Section */}
            <section id="featured-colleges" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center -mt-10 mb-16">
                        <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg">
                            <FaUniversity className="mr-2" />
                            Premier Institutions
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            Featured Colleges
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Explore our carefully curated selection of world-class educational institutions
                            offering exceptional programs and opportunities
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredColleges.map((college, index) => (
                            <div
                                key={college._id || college.id}
                                className="transform hover:scale-105 transition-all duration-500"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <CollegeCard college={college} />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link
                            to="/colleges"
                            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                            Explore All Colleges
                            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* College Image Gallery Section */}
            <section className="py-10 -mt-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg">
                            <FaGraduationCap className="mr-2" />
                            Campus Life
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            Campus Gallery
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Take a visual journey through the vibrant campus life, student activities,
                            and memorable moments from our partner institutions
                        </p>
                    </div>
                    <Gallery />
                </div>
            </section>

            {/* Research Papers Section */}
            <section className="py-6 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg">
                            <FaStar className="mr-2" />
                            Research Excellence
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            Featured Research
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Discover groundbreaking research and innovative projects from students
                            and faculty members of our prestigious partner colleges
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {researchPapers.map((paper, index) => (
                            <div
                                key={paper.id}
                                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-blue-200 group hover:scale-105"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors flex-1 pr-4 leading-tight">
                                        {paper.title}
                                    </h3>
                                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap shadow-lg">
                                        New Research
                                    </span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center text-gray-700">
                                        <FaUniversity className="w-5 h-5 mr-3 text-blue-500" />
                                        <span className="text-lg font-medium">{paper.college}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaUserGraduate className="w-5 h-5 mr-3 text-green-500" />
                                        <span className="text-lg">{paper.authors}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    {paper.abstract}
                                </p>

                                <div className="flex items-center justify-between">
                                    <a
                                        href={paper.link}
                                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        Read Full Paper
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                    <span className="text-sm text-gray-500">
                                        {new Date(paper.publishedDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg">
                            <FaQuoteLeft className="mr-2" />
                            Student Voices
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            Student Experiences
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Hear authentic stories and experiences directly from students about
                            their college journey, campus life, and academic adventures
                        </p>
                    </div>
                    
                    {/* Custom Reviews Section with API Data */}
                    {reviewsLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
                        </div>
                    ) : reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviews.map((review, index) => (
                                <div
                                    key={review._id}
                                    className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-500 hover:scale-105 group"
                                >
                                    {/* Rating Stars */}
                                    <div className="flex items-center mb-4">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < review.rating 
                                                        ? 'text-yellow-400 fill-current' 
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                        <span className="ml-2 text-lg font-semibold text-gray-700">
                                            ({review.rating}.0)
                                        </span>
                                    </div>

                                    {/* Review Comment */}
                                    <div className="mb-6">
                                        <FaQuoteLeft className="w-8 h-8 text-orange-400 mb-4 opacity-60" />
                                        <p className="text-gray-700 text-lg leading-relaxed italic">
                                            "{review.comment}"
                                        </p>
                                    </div>

                                    {/* College and Verification Info */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-gray-800">
                                            <FaUniversity className="w-4 h-4 mr-3 text-blue-500" />
                                            <span className="font-semibold">
                                                {review.college?.name || 'College'}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <FaCalendarAlt className="w-4 h-4 mr-3 text-green-500" />
                                            <span>
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {review.isVerified && (
                                            <div className="flex items-center text-green-600">
                                                <FaCheckCircle className="w-4 h-4 mr-3" />
                                                <span className="text-sm font-medium">Verified Review</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Reviewer Email */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="text-gray-500 text-sm">
                                            Reviewed by: {review.email}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FaQuoteLeft className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No reviews yet</h3>
                            <p className="text-gray-500 mb-6">
                                Be the first to share your college experience!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-green-400 to-blue-600 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8">
                        Ready to Begin Your <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Journey</span>?
                    </h2>
                    <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed">
                        Join thousands of successful students who found their perfect college match through our platform
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            to="/colleges"
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-12 py-6 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                            Explore All Colleges
                        </Link>
                        <Link
                            to="/admission"
                            className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-12 py-6 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105"
                        >
                            Start Application
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;