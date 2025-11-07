// src/Pages/Colleges/Colleges.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CollegeCard from '../../Components/CollegeCard/CollegeCard';

const Colleges = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRating, setFilterRating] = useState('all');
    const [sortBy, setSortBy] = useState('name');

    const colleges = [
        {
            id: 1,
            name: "University of Technology",
            image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            rating: 4.5,
            admissionDates: "Fall 2024: Aug 15 - Sep 30",
            researchCount: 12,
            events: ["Tech Fest 2024", "Cultural Week", "Science Fair"],
            sports: ["Football", "Basketball", "Cricket", "Tennis"],
            researchHistory: "50+ Research Papers Published",
            location: "New York, USA",
            established: 1950,
            students: "15,000+"
        },
        {
            id: 2,
            name: "Cambridge University",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            rating: 4.8,
            admissionDates: "Spring 2024: Jan 10 - Mar 15",
            researchCount: 25,
            events: ["Debate Competition", "Literature Festival", "Research Symposium"],
            sports: ["Rowing", "Rugby", "Cricket", "Athletics"],
            researchHistory: "200+ Research Projects",
            location: "Cambridge, UK",
            established: 1209,
            students: "20,000+"
        },
        {
            id: 3,
            name: "Stanford University",
            image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            rating: 4.7,
            admissionDates: "Winter 2024: Nov 1 - Dec 15",
            researchCount: 18,
            events: ["Innovation Summit", "Startup Expo", "Tech Conference"],
            sports: ["Football", "Basketball", "Swimming", "Golf"],
            researchHistory: "Leading in AI Research",
            location: "California, USA",
            established: 1885,
            students: "17,000+"
        },
        {
            id: 4,
            name: "Harvard University",
            image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            rating: 4.9,
            admissionDates: "Fall 2024: Sep 1 - Oct 30",
            researchCount: 30,
            events: ["Leadership Summit", "Academic Conference", "Career Fair"],
            sports: ["Basketball", "Soccer", "Swimming", "Track & Field"],
            researchHistory: "300+ Research Publications",
            location: "Massachusetts, USA",
            established: 1636,
            students: "22,000+"
        },
        {
            id: 5,
            name: "MIT University",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            rating: 4.8,
            admissionDates: "Spring 2024: Feb 1 - Mar 31",
            researchCount: 22,
            events: ["Tech Innovation", "Research Expo", "Hackathon"],
            sports: ["Basketball", "Soccer", "Volleyball", "Tennis"],
            researchHistory: "Innovation and Technology Focus",
            location: "Massachusetts, USA",
            established: 1861,
            students: "11,000+"
        },
        {
            id: 6,
            name: "Oxford University",
            image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            rating: 4.7,
            admissionDates: "Fall 2024: Oct 1 - Nov 30",
            researchCount: 28,
            events: ["Academic Symposium", "Cultural Festival", "Sports Meet"],
            sports: ["Rowing", "Cricket", "Rugby", "Athletics"],
            researchHistory: "World-class Research Facilities",
            location: "Oxford, UK",
            established: 1096,
            students: "24,000+"
        }
    ];

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
                            <CollegeCard key={college.id} college={college} />
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
                            onClick={() => {
                                setSearchTerm('');
                                setFilterRating('all');
                                setSortBy('name');
                            }}
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