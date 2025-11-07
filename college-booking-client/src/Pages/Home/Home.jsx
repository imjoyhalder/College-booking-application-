// Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';
import CollegeCard from '../../Components/CollegeCard/CollegeCard';
import Gallery from '../../Components/Gallery/Gallery';
import ReviewSection from '../../Components/ReviewSection/ReviewSection';

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Sample data for colleges
    const featuredColleges = [
        {
            id: 1,
            name: "University of Technology",
            image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            admissionDates: "Fall 2024: Aug 15 - Sep 30",
            events: ["Tech Fest 2024", "Cultural Week", "Science Fair"],
            researchHistory: "50+ Research Papers Published",
            sports: ["Football", "Basketball", "Cricket", "Tennis"],
            rating: 4.5,
            researchCount: 12,
            location: "New York, USA",
            established: 1950,
            students: "15,000+"
        },
        {
            id: 2,
            name: "Cambridge University",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            admissionDates: "Spring 2024: Jan 10 - Mar 15",
            events: ["Debate Competition", "Literature Festival", "Research Symposium"],
            researchHistory: "200+ Research Projects",
            sports: ["Rowing", "Rugby", "Cricket", "Athletics"],
            rating: 4.8,
            researchCount: 25,
            location: "Cambridge, UK",
            established: 1209,
            students: "20,000+"
        },
        {
            id: 3,
            name: "Stanford University",
            image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            admissionDates: "Winter 2024: Nov 1 - Dec 15",
            events: ["Innovation Summit", "Startup Expo", "Tech Conference"],
            researchHistory: "Leading in AI Research",
            sports: ["Football", "Basketball", "Swimming", "Golf"],
            rating: 4.7,
            researchCount: 18,
            location: "California, USA",
            established: 1885,
            students: "17,000+"
        }
    ];

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

    // Stats data
    const stats = [
        { number: "50+", label: "Partner Colleges", icon: "🏛️" },
        { number: "10K+", label: "Successful Admissions", icon: "🎓" },
        { number: "95%", label: "Student Satisfaction", icon: "⭐" },
        { number: "24/7", label: "Support Available", icon: "🔧" }
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
                        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 border mt-4 border-white/30">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                            </svg>
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
                                <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
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
                    <div className="text-center mb-16">
                        <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg">
                            🏛️ Premier Institutions
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
                                key={college.id}
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
            <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg">
                            📸 Campus Life
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
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg">
                            📚 Research Excellence
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
                                        <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span className="text-lg font-medium">{paper.college}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
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
                        <span className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold mb-6 shadow-lg">
                            💬 Student Voices
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            Student Experiences
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Hear authentic stories and experiences directly from students about
                            their college journey, campus life, and academic adventures
                        </p>
                    </div>
                    <ReviewSection />
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