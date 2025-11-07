// src/Pages/CollegeDetails/CollegeDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const CollegeDetails = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data - replace with actual data from your backend
    const college = {
        id: 1,
        name: "University of Technology",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 4.5,
        admissionDates: "Fall 2024: Aug 15 - Sep 30",
        researchCount: 12,
        events: [
            {
                name: "Tech Fest 2024",
                date: "2024-03-15",
                description: "Annual technology festival showcasing student innovations and projects."
            },
            {
                name: "Cultural Week",
                date: "2024-04-20",
                description: "Celebration of cultural diversity with performances, food, and activities."
            },
            {
                name: "Science Fair",
                date: "2024-05-10",
                description: "Exhibition of scientific research and experiments by students."
            }
        ],
        sports: [
            {
                category: "Football",
                facilities: "Professional football field with training facilities",
                teams: "Varsity and Junior teams",
                achievements: "State Champions 2023"
            },
            {
                category: "Basketball",
                facilities: "Indoor basketball court with professional flooring",
                teams: "Men's and Women's teams",
                achievements: "Regional Finals 2023"
            },
            {
                category: "Cricket",
                facilities: "Cricket ground with practice nets",
                teams: "Multiple teams for different skill levels",
                achievements: "Inter-college Tournament Winners"
            },
            {
                category: "Tennis",
                facilities: "Multiple tennis courts with lighting",
                teams: "Competitive and recreational teams",
                achievements: "State Level Participants"
            }
        ],
        researchHistory: "50+ Research Papers Published",
        researchWorks: [
            "Artificial Intelligence in Education",
            "Sustainable Energy Solutions",
            "Machine Learning Applications",
            "Blockchain Technology",
            "Cybersecurity Innovations"
        ],
        admissionProcess: `
            The admission process at University of Technology is designed to identify talented and motivated students 
            who will thrive in our academic environment. The process includes:

            1. Online Application: Submit the application form with required documents
            2. Entrance Examination: Take the university entrance test
            3. Interview: Personal interview with the admission committee
            4. Document Verification: Submit original documents for verification
            5. Final Admission: Receive admission offer and complete enrollment

            Required documents include:
            - High school transcripts
            - Standardized test scores
            - Letters of recommendation
            - Personal statement
            - Identification documents
        `,
        location: "New York, USA",
        established: 1950,
        students: "15,000+",
        faculty: "1,200+",
        campusSize: "200 acres",
        accreditation: "Internationally Accredited"
    };

    const tabs = [
        { id: 'overview', name: 'Overview' },
        { id: 'admission', name: 'Admission Process' },
        { id: 'events', name: 'Events' },
        { id: 'sports', name: 'Sports' },
        { id: 'research', name: 'Research' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 bg-gray-900">
                <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{college.name}</h1>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <svg
                                            key={index}
                                            className={`w-5 h-5 ${index < Math.floor(college.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-lg font-semibold">{college.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{college.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Est. {college.established}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-10">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Students', value: college.students },
                        { label: 'Faculty', value: college.faculty },
                        { label: 'Research Papers', value: college.researchCount },
                        { label: 'Campus Size', value: college.campusSize }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex overflow-x-auto">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">About {college.name}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {college.name} is a premier educational institution committed to excellence in education,
                                        research, and innovation. With state-of-the-art facilities and a diverse student community,
                                        we provide an environment that fosters academic growth and personal development.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h4>
                                        <ul className="space-y-2 text-gray-600">
                                            <li className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>World-class faculty and research facilities</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Modern campus with advanced infrastructure</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Strong industry connections and placement opportunities</span>
                                            </li>
                                            <li className="flex items-center space-x-2">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Vibrant campus life with numerous clubs and activities</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Accreditation</h4>
                                        <p className="text-gray-600 mb-4">{college.accreditation}</p>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Admission Period</h4>
                                        <p className="text-blue-600 font-semibold">{college.admissionDates}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Admission Process Tab */}
                        {activeTab === 'admission' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Admission Process</h3>
                                <div className="bg-blue-50 rounded-lg p-6">
                                    <pre className="text-gray-700 whitespace-pre-wrap font-sans">
                                        {college.admissionProcess}
                                    </pre>
                                </div>
                                <div className="text-center">
                                    <Link
                                        to="/admission"
                                        className="inline-flex items-center bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                                    >
                                        Start Application
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Events Tab */}
                        {activeTab === 'events' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {college.events.map((event, index) => (
                                        <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-lg font-semibold text-gray-800">{event.name}</h4>
                                                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                                                    {new Date(event.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-600">{event.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sports Tab */}
                        {activeTab === 'sports' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Sports Facilities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {college.sports.map((sport, index) => (
                                        <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                            <h4 className="text-xl font-semibold text-gray-800 mb-3">{sport.category}</h4>
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="font-medium text-gray-700">Facilities:</span>
                                                    <p className="text-gray-600">{sport.facilities}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-700">Teams:</span>
                                                    <p className="text-gray-600">{sport.teams}</p>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-700">Achievements:</span>
                                                    <p className="text-gray-600">{sport.achievements}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Research Tab */}
                        {activeTab === 'research' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Research Works</h3>
                                <p className="text-gray-600">{college.researchHistory}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {college.researchWorks.map((work, index) => (
                                        <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                            <div className="flex items-center space-x-3">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                </svg>
                                                <span className="font-medium text-gray-800">{work}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Join {college.name}?</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Take the first step towards your educational journey at one of the world's leading institutions.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                            to="/admission"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                        >
                            Apply Now
                        </Link>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
                            Download Brochure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;