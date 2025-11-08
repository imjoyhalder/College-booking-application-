
import { useEffect, useState } from 'react';

import CollegeCard from '../../Components/CollegeCard/CollegeCard';

const Colleges = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRating, setFilterRating] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://college-booking-application.vercel.app/api/colleges');
                const data = await res.json();

                if (data.success) {
                    setColleges(data.data || []);
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

    console.log(colleges);

    // Filter and sort colleges
    const filteredColleges = colleges
        .filter(college => {
            const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                college.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRating = filterRating === 'all' ||
                (filterRating === '4.5+' && college.rating >= 4.5) ||
                (filterRating === '4.0+' && college.rating >= 4.0) ||
                (filterRating === '3.5+' && college.rating >= 3.5);
            return matchesSearch && matchesRating;
        })
        .sort((a, b) => {
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

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm('');
        setFilterRating('all');
        setSortBy('name');
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Explore Colleges
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Loading colleges...
                        </p>
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
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Explore Colleges
                        </h1>
                    </div>
                    <div className="text-center py-16">
                        <svg className="w-24 h-24 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">Error Loading Colleges</h3>
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
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Explore Colleges
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover top educational institutions with world-class facilities, research opportunities, and vibrant campus life.
                    </p>
                </div>

                {/* Search and Filters */}
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
                                <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum Rating
                            </label>
                            <select
                                value={filterRating}
                                onChange={(e) => setFilterRating(e.target.value)}
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
                </div>

                {/* Results Count */}
                <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                        Showing {filteredColleges.length} of {colleges.length} colleges
                    </p>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">View:</span>
                        <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg font-medium">
                            Grid
                        </button>
                        <button className="px-3 py-1 text-gray-500 hover:text-blue-600 rounded-lg font-medium">
                            List
                        </button>
                    </div>
                </div>

                {/* Colleges Grid */}
                {filteredColleges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredColleges.map(college => (
                            <CollegeCard key={college._id} college={college} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">No colleges found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                        <button
                            onClick={handleResetFilters}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Stats Section */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold">{colleges.length}+</div>
                            <div className="text-blue-100">Colleges</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">50K+</div>
                            <div className="text-blue-100">Students</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">200+</div>
                            <div className="text-blue-100">Research Papers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">95%</div>
                            <div className="text-blue-100">Success Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Colleges;