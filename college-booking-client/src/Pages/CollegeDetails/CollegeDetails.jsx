// src/Pages/CollegeDetails/CollegeDetails.jsx

// import { useParams, Link } from 'react-router-dom';
// import { useState } from 'react';

// const CollegeDetails = () => {
//     const { id } = useParams();
//     const [activeTab, setActiveTab] = useState('overview');

//     // Mock data - replace with actual data from your backend
//     const college = {
//         id: 1,
//         name: "University of Technology",
//         image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//         rating: 4.5,
//         admissionDates: "Fall 2024: Aug 15 - Sep 30",
//         researchCount: 12,
//         events: [
//             {
//                 name: "Tech Fest 2024",
//                 date: "2024-03-15",
//                 description: "Annual technology festival showcasing student innovations and projects."
//             },
//             {
//                 name: "Cultural Week",
//                 date: "2024-04-20",
//                 description: "Celebration of cultural diversity with performances, food, and activities."
//             },
//             {
//                 name: "Science Fair",
//                 date: "2024-05-10",
//                 description: "Exhibition of scientific research and experiments by students."
//             }
//         ],
//         sports: [
//             {
//                 category: "Football",
//                 facilities: "Professional football field with training facilities",
//                 teams: "Varsity and Junior teams",
//                 achievements: "State Champions 2023"
//             },
//             {
//                 category: "Basketball",
//                 facilities: "Indoor basketball court with professional flooring",
//                 teams: "Men's and Women's teams",
//                 achievements: "Regional Finals 2023"
//             },
//             {
//                 category: "Cricket",
//                 facilities: "Cricket ground with practice nets",
//                 teams: "Multiple teams for different skill levels",
//                 achievements: "Inter-college Tournament Winners"
//             },
//             {
//                 category: "Tennis",
//                 facilities: "Multiple tennis courts with lighting",
//                 teams: "Competitive and recreational teams",
//                 achievements: "State Level Participants"
//             }
//         ],
//         researchHistory: "50+ Research Papers Published",
//         researchWorks: [
//             "Artificial Intelligence in Education",
//             "Sustainable Energy Solutions",
//             "Machine Learning Applications",
//             "Blockchain Technology",
//             "Cybersecurity Innovations"
//         ],
//         admissionProcess: `
//             The admission process at University of Technology is designed to identify talented and motivated students 
//             who will thrive in our academic environment. The process includes:

//             1. Online Application: Submit the application form with required documents
//             2. Entrance Examination: Take the university entrance test
//             3. Interview: Personal interview with the admission committee
//             4. Document Verification: Submit original documents for verification
//             5. Final Admission: Receive admission offer and complete enrollment

//             Required documents include:
//             - High school transcripts
//             - Standardized test scores
//             - Letters of recommendation
//             - Personal statement
//             - Identification documents
//         `,
//         location: "New York, USA",
//         established: 1950,
//         students: "15,000+",
//         faculty: "1,200+",
//         campusSize: "200 acres",
//         accreditation: "Internationally Accredited"
//     };

//     const tabs = [
//         { id: 'overview', name: 'Overview' },
//         { id: 'admission', name: 'Admission Process' },
//         { id: 'events', name: 'Events' },
//         { id: 'sports', name: 'Sports' },
//         { id: 'research', name: 'Research' }
//     ];

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Hero Section */}
//             <div className="relative h-96 bg-gray-900">
//                 <img
//                     src={college.image}
//                     alt={college.name}
//                     className="w-full h-full object-cover opacity-60"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                     <div className="container mx-auto">
//                         <h1 className="text-4xl md:text-5xl font-bold mb-4">{college.name}</h1>
//                         <div className="flex flex-wrap items-center gap-6">
//                             <div className="flex items-center space-x-2">
//                                 <div className="flex">
//                                     {Array.from({ length: 5 }, (_, index) => (
//                                         <svg
//                                             key={index}
//                                             className={`w-5 h-5 ${index < Math.floor(college.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                                             fill="currentColor"
//                                             viewBox="0 0 20 20"
//                                         >
//                                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                         </svg>
//                                     ))}
//                                 </div>
//                                 <span className="text-lg font-semibold">{college.rating}</span>
//                             </div>
//                             <div className="flex items-center space-x-1">
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                                 <span>{college.location}</span>
//                             </div>
//                             <div className="flex items-center space-x-1">
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                                 <span>Est. {college.established}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="container mx-auto px-4 -mt-16 relative z-10">
//                 {/* Quick Stats */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//                     {[
//                         { label: 'Students', value: college.students },
//                         { label: 'Faculty', value: college.faculty },
//                         { label: 'Research Papers', value: college.researchCount },
//                         { label: 'Campus Size', value: college.campusSize }
//                     ].map((stat, index) => (
//                         <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
//                             <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                             <div className="text-gray-600">{stat.label}</div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Main Content */}
//                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
//                     {/* Tabs */}
//                     <div className="border-b border-gray-200">
//                         <nav className="flex overflow-x-auto">
//                             {tabs.map(tab => (
//                                 <button
//                                     key={tab.id}
//                                     onClick={() => setActiveTab(tab.id)}
//                                     className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
//                                             ? 'border-blue-500 text-blue-600'
//                                             : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                                         }`}
//                                 >
//                                     {tab.name}
//                                 </button>
//                             ))}
//                         </nav>
//                     </div>

//                     {/* Tab Content */}
//                     <div className="p-8">
//                         {/* Overview Tab */}
//                         {activeTab === 'overview' && (
//                             <div className="space-y-6">
//                                 <div>
//                                     <h3 className="text-2xl font-bold text-gray-800 mb-4">About {college.name}</h3>
//                                     <p className="text-gray-600 leading-relaxed">
//                                         {college.name} is a premier educational institution committed to excellence in education,
//                                         research, and innovation. With state-of-the-art facilities and a diverse student community,
//                                         we provide an environment that fosters academic growth and personal development.
//                                     </p>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h4>
//                                         <ul className="space-y-2 text-gray-600">
//                                             <li className="flex items-center space-x-2">
//                                                 <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                                 </svg>
//                                                 <span>World-class faculty and research facilities</span>
//                                             </li>
//                                             <li className="flex items-center space-x-2">
//                                                 <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                                 </svg>
//                                                 <span>Modern campus with advanced infrastructure</span>
//                                             </li>
//                                             <li className="flex items-center space-x-2">
//                                                 <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                                 </svg>
//                                                 <span>Strong industry connections and placement opportunities</span>
//                                             </li>
//                                             <li className="flex items-center space-x-2">
//                                                 <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                                 </svg>
//                                                 <span>Vibrant campus life with numerous clubs and activities</span>
//                                             </li>
//                                         </ul>
//                                     </div>

//                                     <div>
//                                         <h4 className="text-lg font-semibold text-gray-800 mb-3">Accreditation</h4>
//                                         <p className="text-gray-600 mb-4">{college.accreditation}</p>
//                                         <h4 className="text-lg font-semibold text-gray-800 mb-3">Admission Period</h4>
//                                         <p className="text-blue-600 font-semibold">{college.admissionDates}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Admission Process Tab */}
//                         {activeTab === 'admission' && (
//                             <div className="space-y-6">
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Admission Process</h3>
//                                 <div className="bg-blue-50 rounded-lg p-6">
//                                     <pre className="text-gray-700 whitespace-pre-wrap font-sans">
//                                         {college.admissionProcess}
//                                     </pre>
//                                 </div>
//                                 <div className="text-center">
//                                     <Link
//                                         to="/admission"
//                                         className="inline-flex items-center bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
//                                     >
//                                         Start Application
//                                         <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                         </svg>
//                                     </Link>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Events Tab */}
//                         {activeTab === 'events' && (
//                             <div className="space-y-6">
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {college.events.map((event, index) => (
//                                         <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                                             <div className="flex items-center justify-between mb-3">
//                                                 <h4 className="text-lg font-semibold text-gray-800">{event.name}</h4>
//                                                 <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
//                                                     {new Date(event.date).toLocaleDateString()}
//                                                 </span>
//                                             </div>
//                                             <p className="text-gray-600">{event.description}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Sports Tab */}
//                         {activeTab === 'sports' && (
//                             <div className="space-y-6">
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Sports Facilities</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {college.sports.map((sport, index) => (
//                                         <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                                             <h4 className="text-xl font-semibold text-gray-800 mb-3">{sport.category}</h4>
//                                             <div className="space-y-2">
//                                                 <div>
//                                                     <span className="font-medium text-gray-700">Facilities:</span>
//                                                     <p className="text-gray-600">{sport.facilities}</p>
//                                                 </div>
//                                                 <div>
//                                                     <span className="font-medium text-gray-700">Teams:</span>
//                                                     <p className="text-gray-600">{sport.teams}</p>
//                                                 </div>
//                                                 <div>
//                                                     <span className="font-medium text-gray-700">Achievements:</span>
//                                                     <p className="text-gray-600">{sport.achievements}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Research Tab */}
//                         {activeTab === 'research' && (
//                             <div className="space-y-6">
//                                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Research Works</h3>
//                                 <p className="text-gray-600">{college.researchHistory}</p>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     {college.researchWorks.map((work, index) => (
//                                         <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//                                             <div className="flex items-center space-x-3">
//                                                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                                                 </svg>
//                                                 <span className="font-medium text-gray-800">{work}</span>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Call to Action */}
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-2 text-center">
//                     <h3 className="text-2xl font-bold mb-4">Ready to Join {college.name}?</h3>
//                     <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
//                         Take the first step towards your educational journey at one of the world's leading institutions.
//                     </p>
//                     <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//                         <Link
//                             to="/admission"
//                             className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
//                         >
//                             Apply Now
//                         </Link>
//                         <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
//                             Download Brochure
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CollegeDetails;

// src/Pages/CollegeDetails/CollegeDetails.jsx


// import { useParams, Link, useNavigate } from 'react-router-dom';


// import { useState, useEffect } from 'react';
// import {
//     FaStar,
//     FaMapMarkerAlt,
//     FaCalendarAlt,
//     FaGraduationCap,
//     FaChalkboardTeacher,
//     FaFileAlt,
//     FaUniversity,
//     FaCheck,
//     FaTrophy,
//     FaAward,
//     FaFlask,
//     FaFootballBall,
//     FaBasketballBall,
//     FaBaseballBall,
//     FaTennisBall,
//     FaImages,
//     FaArrowRight,
//     FaPhone,
//     FaDownload,
//     FaRocket,
//     FaExclamationTriangle
// } from 'react-icons/fa';
// import {
//     HiAcademicCap,
//     HiUsers,
//     HiDocumentText,
//     HiLocationMarker,
//     HiCalendar
// } from 'react-icons/hi';

// const CollegeDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState('overview');
//     const [college, setCollege] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCollegeDetails = async () => {
//             try {
//                 setLoading(true);
//                 const res = await fetch(`http://localhost:5000/api/colleges/${id}`);
//                 const data = await res.json();

//                 if (data.success) {
//                     setCollege(data.data);
//                 } else {
//                     setError('College not found');
//                 }
//             } catch (error) {
//                 console.error("Error fetching college details:", error);
//                 setError('Failed to load college details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchCollegeDetails();
//         }
//     }, [id]);

//     const tabs = [
//         { id: 'overview', name: 'Overview', icon: HiAcademicCap },
//         { id: 'admission', name: 'Admission', icon: FaFileAlt },
//         { id: 'events', name: 'Events', icon: FaCalendarAlt },
//         { id: 'sports', name: 'Sports', icon: FaFootballBall },
//         { id: 'research', name: 'Research', icon: FaFlask },
//         { id: 'gallery', name: 'Gallery', icon: FaImages }
//     ];

//     // Loading state
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                     <p className="text-gray-600 text-lg">Loading college details...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (error || !college) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center max-w-md mx-auto p-6">
//                     <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <FaExclamationTriangle className="w-12 h-12 text-red-500" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-800 mb-2">College Not Found</h3>
//                     <p className="text-gray-600 mb-6">{error || 'The college you are looking for does not exist.'}</p>
//                     <button
//                         onClick={() => navigate('/colleges')}
//                         className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
//                     >
//                         Browse Colleges
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Format date for events
//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     // Render star rating
//     const renderStars = (rating) => {
//         return Array.from({ length: 5 }, (_, index) => (
//             <FaStar
//                 key={index}
//                 className={`w-5 h-5 ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//             />
//         ));
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Hero Section with Improved Design */}
//             <div className="relative h-80 lg:h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
//                 <img
//                     src={college.image || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
//                     alt={college.name}
//                     className="w-full h-full object-cover mix-blend-overlay opacity-40"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
//                 <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
//                     <div className="container mx-auto">
//                         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
//                             <div className="flex-1">
//                                 <h1 className="text-3xl lg:text-5xl font-bold mb-3 leading-tight">{college.name}</h1>
//                                 <div className="flex flex-wrap items-center gap-4 text-sm lg:text-base">
//                                     <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
//                                         <div className="flex">
//                                             {renderStars(college.rating || 0)}
//                                         </div>
//                                         <span className="font-semibold">{college.rating || 'N/A'}</span>
//                                     </div>
//                                     <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
//                                         <FaMapMarkerAlt className="w-4 h-4" />
//                                         <span>{college.location || 'Location not specified'}</span>
//                                     </div>
//                                     <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
//                                         <FaCalendarAlt className="w-4 h-4" />
//                                         <span>Est. {college.established || 'N/A'}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-4 lg:mt-0">
//                                 <button className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
//                                     Apply Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="container mx-auto px-4 -mt-8 relative z-10">
//                 {/* Enhanced Quick Stats */}
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
//                     {[
//                         {
//                             label: 'Students',
//                             value: college.students || 'N/A',
//                             icon: FaGraduationCap,
//                             color: 'from-blue-500 to-blue-600'
//                         },
//                         {
//                             label: 'Faculty',
//                             value: college.facultyCount || college.faculty || 'N/A',
//                             icon: FaChalkboardTeacher,
//                             color: 'from-green-500 to-green-600'
//                         },
//                         {
//                             label: 'Research Papers',
//                             value: college.researchCount || college.researchPapers || 'N/A',
//                             icon: FaFileAlt,
//                             color: 'from-purple-500 to-purple-600'
//                         },
//                         {
//                             label: 'Campus Size',
//                             value: college.campusSize || 'N/A',
//                             icon: FaUniversity,
//                             color: 'from-orange-500 to-orange-600'
//                         }
//                     ].map((stat, index) => (
//                         <div key={index} className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//                             <div className="flex justify-center mb-2">
//                                 <stat.icon className={`w-8 h-8 text-2xl lg:text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
//                             </div>
//                             <div className={`text-xl lg:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
//                                 {stat.value}
//                             </div>
//                             <div className="text-gray-600 text-sm lg:text-base">{stat.label}</div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Main Content */}
//                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
//                     {/* Enhanced Tabs */}
//                     <div className="border-b border-gray-200 bg-gray-50/50">
//                         <nav className="flex overflow-x-auto scrollbar-hide">
//                             {tabs.map(tab => {
//                                 const IconComponent = tab.icon;
//                                 return (
//                                     <button
//                                         key={tab.id}
//                                         onClick={() => setActiveTab(tab.id)}
//                                         className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
//                                                 ? 'border-blue-500 text-blue-600 bg-white shadow-sm'
//                                                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50'
//                                             }`}
//                                     >
//                                         <IconComponent className="w-4 h-4" />
//                                         <span>{tab.name}</span>
//                                     </button>
//                                 );
//                             })}
//                         </nav>
//                     </div>

//                     {/* Tab Content */}
//                     <div className="p-6 lg:p-8">
//                         {/* Overview Tab */}
//                         {activeTab === 'overview' && (
//                             <div className="space-y-8">
//                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                                     <div>
//                                         <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">About {college.name}</h3>
//                                         <p className="text-gray-600 leading-relaxed text-lg">
//                                             {college.description || `${college.name} is a premier educational institution committed to excellence in education, research, and innovation. With state-of-the-art facilities and a diverse student community, we provide an environment that fosters academic growth and personal development.`}
//                                         </p>
//                                     </div>
//                                     <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
//                                         <h4 className="text-xl font-semibold text-gray-800 mb-4">Key Information</h4>
//                                         <div className="space-y-3">
//                                             {[
//                                                 { label: 'Accreditation', value: college.accreditation || 'Nationally Accredited' },
//                                                 { label: 'Admission Period', value: college.admissionDates || 'Rolling Admissions' },
//                                                 { label: 'Campus Type', value: college.campusType || 'Urban' },
//                                                 { label: 'Website', value: college.website || 'Not available', isLink: true }
//                                             ].map((item, index) => (
//                                                 <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
//                                                     <span className="font-medium text-gray-700">{item.label}:</span>
//                                                     {item.isLink && item.value !== 'Not available' ? (
//                                                         <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
//                                                             Visit Website
//                                                         </a>
//                                                     ) : (
//                                                         <span className="text-gray-600">{item.value}</span>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                                             <HiAcademicCap className="w-5 h-5 mr-2 text-blue-600" />
//                                             Key Features
//                                         </h4>
//                                         <ul className="space-y-3">
//                                             {(college.features || [
//                                                 'World-class faculty and research facilities',
//                                                 'Modern campus with advanced infrastructure',
//                                                 'Strong industry connections and placement opportunities',
//                                                 'Vibrant campus life with numerous clubs and activities'
//                                             ]).map((feature, index) => (
//                                                 <li key={index} className="flex items-start space-x-3">
//                                                     <FaCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                                                     <span className="text-gray-600">{feature}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                     <div>
//                                         <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                                             <FaTrophy className="w-5 h-5 mr-2 text-yellow-600" />
//                                             Achievements
//                                         </h4>
//                                         <ul className="space-y-3">
//                                             {(college.achievements || [
//                                                 'Ranked among top 50 institutions nationally',
//                                                 'Award for Excellence in Research 2023',
//                                                 'Best Student Life Award 2022',
//                                                 'Green Campus Certification'
//                                             ]).map((achievement, index) => (
//                                                 <li key={index} className="flex items-start space-x-3">
//                                                     <FaAward className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
//                                                     <span className="text-gray-600">{achievement}</span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Admission Process Tab */}
//                         {activeTab === 'admission' && (
//                             <div className="space-y-8">
//                                 <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Admission Process</h3>

//                                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 lg:p-8">
//                                     <div className="prose prose-lg max-w-none">
//                                         <p className="text-gray-700 mb-6">
//                                             {college.admissionProcess || `The admission process at ${college.name} is designed to identify talented and motivated students who will thrive in our academic environment.`}
//                                         </p>

//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                                             {[
//                                                 { step: 1, title: 'Online Application', desc: 'Submit the application form with required documents' },
//                                                 { step: 2, title: 'Entrance Examination', desc: 'Take the university entrance test' },
//                                                 { step: 3, title: 'Interview', desc: 'Personal interview with admission committee' },
//                                                 { step: 4, title: 'Final Admission', desc: 'Receive admission offer and complete enrollment' }
//                                             ].map((item) => (
//                                                 <div key={item.step} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                                                     <div className="flex items-center space-x-4">
//                                                         <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
//                                                             {item.step}
//                                                         </div>
//                                                         <div>
//                                                             <h4 className="font-semibold text-gray-800">{item.title}</h4>
//                                                             <p className="text-gray-600 text-sm">{item.desc}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>

//                                         <div className="bg-white rounded-xl p-6 border border-gray-200">
//                                             <h4 className="font-semibold text-gray-800 mb-4">Required Documents</h4>
//                                             <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
//                                                 {[
//                                                     'High school transcripts',
//                                                     'Standardized test scores',
//                                                     'Letters of recommendation',
//                                                     'Personal statement',
//                                                     'Identification documents',
//                                                     'Passport size photographs',
//                                                     'Proof of English proficiency',
//                                                     'Financial documentation'
//                                                 ].map((doc, index) => (
//                                                     <li key={index} className="flex items-center space-x-2">
//                                                         <FaCheck className="w-4 h-4 text-green-500" />
//                                                         <span>{doc}</span>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="text-center bg-white rounded-2xl p-8 border border-gray-200">
//                                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Ready to Apply?</h4>
//                                     <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//                                         Start your application process today and take the first step towards your future at {college.name}.
//                                     </p>
//                                     <div className="flex flex-col sm:flex-row justify-center gap-4">
//                                         <Link
//                                             to="/admission"
//                                             className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
//                                         >
//                                             <span>Start Application</span>
//                                             <FaArrowRight className="w-4 h-4" />
//                                         </Link>
//                                         <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2">
//                                             <FaDownload className="w-4 h-4" />
//                                             <span>Download Brochure</span>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Events Tab */}
//                         {activeTab === 'events' && (
//                             <div className="space-y-8">
//                                 <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h3>

//                                 <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//                                     {(college.events || [
//                                         {
//                                             name: "Tech Fest 2024",
//                                             date: "2024-03-15",
//                                             description: "Annual technology festival showcasing student innovations and projects.",
//                                             type: "Conference"
//                                         },
//                                         {
//                                             name: "Cultural Week",
//                                             date: "2024-04-20",
//                                             description: "Celebration of cultural diversity with performances, food, and activities.",
//                                             type: "Cultural"
//                                         },
//                                         {
//                                             name: "Science Fair",
//                                             date: "2024-05-10",
//                                             description: "Exhibition of scientific research and experiments by students.",
//                                             type: "Academic"
//                                         }
//                                     ]).map((event, index) => (
//                                         <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
//                                             <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
//                                                 <div className="flex justify-between items-start">
//                                                     <div>
//                                                         <span className="text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
//                                                             {event.type}
//                                                         </span>
//                                                     </div>
//                                                     <div className="text-right">
//                                                         <div className="text-2xl font-bold">
//                                                             {new Date(event.date).getDate()}
//                                                         </div>
//                                                         <div className="text-sm opacity-90">
//                                                             {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="p-6">
//                                                 <h4 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
//                                                     {event.name}
//                                                 </h4>
//                                                 <p className="text-gray-600 mb-4 leading-relaxed">
//                                                     {event.description}
//                                                 </p>
//                                                 <div className="flex items-center justify-between text-sm text-gray-500">
//                                                     <span>{formatDate(event.date)}</span>
//                                                     <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1">
//                                                         <span>Learn More</span>
//                                                         <FaArrowRight className="w-3 h-3" />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {(!college.events || college.events.length === 0) && (
//                                     <div className="text-center py-12">
//                                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                                             <HiCalendar className="w-8 h-8 text-gray-400" />
//                                         </div>
//                                         <h4 className="text-xl font-semibold text-gray-600 mb-2">No Upcoming Events</h4>
//                                         <p className="text-gray-500">Check back later for upcoming events and activities.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         )}

//                         {/* Sports Tab */}
//                         {activeTab === 'sports' && (
//                             <div className="space-y-8">
//                                 <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Sports Facilities</h3>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {(college.sports || [
//                                         {
//                                             category: "Football",
//                                             facilities: "Professional football field with training facilities",
//                                             teams: "Varsity and Junior teams",
//                                             achievements: "State Champions 2023",
//                                             icon: FaFootballBall
//                                         },
//                                         {
//                                             category: "Basketball",
//                                             facilities: "Indoor basketball court with professional flooring",
//                                             teams: "Men's and Women's teams",
//                                             achievements: "Regional Finals 2023",
//                                             icon: FaBasketballBall
//                                         },
//                                         {
//                                             category: "Baseball",
//                                             facilities: "Baseball field with batting cages",
//                                             teams: "Varsity and Club teams",
//                                             achievements: "Conference Champions 2023",
//                                             icon: FaBaseballBall
//                                         },
//                                         {
//                                             category: "Tennis",
//                                             facilities: "Multiple tennis courts with lighting",
//                                             teams: "Competitive and recreational teams",
//                                             achievements: "State Level Participants",
//                                             icon: FaTennisBall
//                                         }
//                                     ]).map((sport, index) => {
//                                         const SportIcon = sport.icon;
//                                         return (
//                                             <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
//                                                 <div className="flex items-start justify-between mb-4">
//                                                     <div className="flex items-center space-x-3">
//                                                         <SportIcon className="w-6 h-6 text-blue-600" />
//                                                         <h4 className="text-xl font-semibold text-gray-800">{sport.category}</h4>
//                                                     </div>
//                                                     <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
//                                                         Active
//                                                     </span>
//                                                 </div>
//                                                 <div className="space-y-4">
//                                                     <div>
//                                                         <span className="font-medium text-gray-700 text-sm flex items-center space-x-1">
//                                                             <FaUniversity className="w-3 h-3" />
//                                                             <span>Facilities:</span>
//                                                         </span>
//                                                         <p className="text-gray-600 mt-1">{sport.facilities}</p>
//                                                     </div>
//                                                     <div>
//                                                         <span className="font-medium text-gray-700 text-sm flex items-center space-x-1">
//                                                             <HiUsers className="w-3 h-3" />
//                                                             <span>Teams:</span>
//                                                         </span>
//                                                         <p className="text-gray-600 mt-1">{sport.teams}</p>
//                                                     </div>
//                                                     <div>
//                                                         <span className="font-medium text-gray-700 text-sm flex items-center space-x-1">
//                                                             <FaTrophy className="w-3 h-3" />
//                                                             <span>Achievements:</span>
//                                                         </span>
//                                                         <p className="text-gray-600 mt-1">{sport.achievements}</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Research Tab */}
//                         {activeTab === 'research' && (
//                             <div className="space-y-8">
//                                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
//                                     <h3 className="text-2xl lg:text-3xl font-bold mb-4 flex items-center">
//                                         <FaFlask className="w-8 h-8 mr-3" />
//                                         Research & Innovation
//                                     </h3>
//                                     <p className="text-blue-100 text-lg max-w-3xl">
//                                         {college.researchHistory || `${college.name} is at the forefront of innovation with groundbreaking research across multiple disciplines.`}
//                                     </p>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {(college.researchWorks || [
//                                         "Artificial Intelligence in Education",
//                                         "Sustainable Energy Solutions",
//                                         "Machine Learning Applications",
//                                         "Blockchain Technology",
//                                         "Cybersecurity Innovations",
//                                         "Biomedical Engineering"
//                                     ]).map((work, index) => (
//                                         <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group hover:border-blue-200">
//                                             <div className="flex items-center space-x-4">
//                                                 <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
//                                                     <FaFlask className="w-6 h-6 text-blue-600 group-hover:text-white" />
//                                                 </div>
//                                                 <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
//                                                     {work}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="bg-gray-50 rounded-2xl p-6">
//                                     <h4 className="text-xl font-semibold text-gray-800 mb-4">Research Statistics</h4>
//                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//                                         {[
//                                             { label: 'Ongoing Projects', value: '25+', icon: FaFlask },
//                                             { label: 'Publications', value: '150+', icon: FaFileAlt },
//                                             { label: 'Research Centers', value: '12', icon: FaUniversity },
//                                             { label: 'Industry Partners', value: '45', icon: HiUsers }
//                                         ].map((stat, index) => {
//                                             const StatIcon = stat.icon;
//                                             return (
//                                                 <div key={index} className="bg-white rounded-xl p-4">
//                                                     <StatIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
//                                                     <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
//                                                     <div className="text-gray-600 text-sm">{stat.label}</div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Gallery Tab */}
//                         {activeTab === 'gallery' && (
//                             <div className="space-y-8">
//                                 <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Campus Gallery</h3>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {[
//                                         { type: 'Campus', image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
//                                         { type: 'Library', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
//                                         { type: 'Sports', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
//                                         { type: 'Labs', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
//                                         { type: 'Events', image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
//                                         { type: 'Student Life', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
//                                     ].map((item, index) => (
//                                         <div key={index} className="group cursor-pointer">
//                                             <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
//                                                 <img
//                                                     src={item.image}
//                                                     alt={item.type}
//                                                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                                 />
//                                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                                                     <span className="text-white font-semibold text-lg">{item.type}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Enhanced Call to Action */}
//                 <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white text-center mb-8">
//                     <div className="max-w-4xl mx-auto">
//                         <h3 className="text-2xl lg:text-4xl font-bold mb-4">Ready to Join {college.name}?</h3>
//                         <p className="text-blue-100 text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
//                             Take the first step towards your educational journey at one of the world's leading institutions.
//                         </p>
//                         <div className="flex flex-col sm:flex-row justify-center gap-4">
//                             <Link
//                                 to="/admission"
//                                 className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
//                             >
//                                 <FaRocket className="w-5 h-5" />
//                                 <span>Apply Now</span>
//                             </Link>
//                             <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2">
//                                 <FaDownload className="w-5 h-5" />
//                                 <span>Download Brochure</span>
//                             </button>
//                             <button className="border-2 border-white/50 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2">
//                                 <FaPhone className="w-5 h-5" />
//                                 <span>Contact Us</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CollegeDetails;


// src/Pages/CollegeDetails/CollegeDetails.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    FaStar,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaGraduationCap,
    FaChalkboardTeacher,
    FaFileAlt,
    FaUniversity,
    FaCheck,
    FaTrophy,
    FaAward,
    FaFlask,
    FaFootballBall,
    FaBasketballBall,
    FaBaseballBall,
    FaTableTennis,
    FaImages,
    FaArrowRight,
    FaPhone,
    FaDownload,
    FaRocket,
    FaExclamationTriangle,
    FaRunning,
    FaVolleyballBall
} from 'react-icons/fa';
import {
    HiAcademicCap,
    HiUsers,
    HiCalendar
} from 'react-icons/hi';

import {
    FaBasketball,
    FaFootball,
    FaBaseballBatBall,
    FaTableTennisPaddleBall,
    FaPersonRunning,
    FaVolleyball
} from "react-icons/fa6";

const CollegeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollegeDetails = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5000/api/colleges/${id}`);
                const data = await res.json();

                if (data.success) {
                    setCollege(data.data);
                } else {
                    setError('College not found');
                }
            } catch (error) {
                console.error("Error fetching college details:", error);
                setError('Failed to load college details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCollegeDetails();
        }
    }, [id]);

    const tabs = [
        { id: 'overview', name: 'Overview', icon: HiAcademicCap },
        { id: 'admission', name: 'Admission', icon: FaFileAlt },
        { id: 'events', name: 'Events', icon: FaCalendarAlt },
        { id: 'sports', name: 'Sports', icon: FaFootball },
        { id: 'research', name: 'Research', icon: FaFlask },
        { id: 'gallery', name: 'Gallery', icon: FaImages }
    ];

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading college details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !college) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaExclamationTriangle className="w-12 h-12 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">College Not Found</h3>
                    <p className="text-gray-600 mb-6">{error || 'The college you are looking for does not exist.'}</p>
                    <button
                        onClick={() => navigate('/colleges')}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                    >
                        Browse Colleges
                    </button>
                </div>
            </div>
        );
    }

    // Format date for events
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Render star rating
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                className={`w-5 h-5 ${index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Improved Design */}
            <div className="relative h-80 lg:h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
                <img
                    src={college.image || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                    alt={college.name}
                    className="w-full h-full object-cover mix-blend-overlay opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
                    <div className="container mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                            <div className="flex-1">
                                <h1 className="text-3xl lg:text-5xl font-bold mb-3 leading-tight">{college.name}</h1>
                                <div className="flex flex-wrap items-start gap-4 text-sm lg:text-base">
                                    <div className="flex mb-8 items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                        <div className="flex">
                                            {renderStars(college.rating || 0)}
                                        </div>
                                        <span className="font-semibold">{college.rating || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                        <FaMapMarkerAlt className="w-4 h-4" />
                                        <span>{college.location || 'Location not specified'}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                        <FaCalendarAlt className="w-4 h-4" />
                                        <span>Est. {college.established || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-10">
                {/* Enhanced Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                    {[
                        {
                            label: 'Students',
                            value: college.students || 'N/A',
                            icon: FaGraduationCap,
                            color: 'from-blue-500 to-blue-600'
                        },
                        {
                            label: 'Faculty',
                            value: college.facultyCount || college.faculty || 'N/A',
                            icon: FaChalkboardTeacher,
                            color: 'from-green-500 to-green-600'
                        },
                        {
                            label: 'Research Papers',
                            value: college.researchCount || college.researchPapers || 'N/A',
                            icon: FaFileAlt,
                            color: 'from-purple-500 to-purple-600'
                        },
                        {
                            label: 'Campus Size',
                            value: college.campusSize || 'N/A',
                            icon: FaUniversity,
                            color: 'from-orange-500 to-orange-600'
                        }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex justify-center mb-2">
                                <stat.icon className={`w-8 h-8 text-2xl lg:text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                            </div>
                            <div className={`text-xl lg:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                {stat.value}
                            </div>
                            <div className="text-gray-600 text-sm lg:text-base">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    {/* Enhanced Tabs */}
                    <div className="border-b border-gray-200 bg-gray-50/50">
                        <nav className="flex overflow-x-auto scrollbar-hide">
                            {tabs.map(tab => {
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600 bg-white shadow-sm'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50'
                                            }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        <span>{tab.name}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 lg:p-8">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">About {college.name}</h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {college.description || `${college.name} is a premier educational institution committed to excellence in education, research, and innovation. With state-of-the-art facilities and a diverse student community, we provide an environment that fosters academic growth and personal development.`}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                                        <h4 className="text-xl font-semibold text-gray-800 mb-4">Key Information</h4>
                                        <div className="space-y-3">
                                            {[
                                                { label: 'Accreditation', value: college.accreditation || 'Nationally Accredited' },
                                                { label: 'Admission Period', value: college.admissionDates || 'Rolling Admissions' },
                                                { label: 'Campus Type', value: college.campusType || 'Urban' },
                                                { label: 'Website', value: college.website || 'Not available', isLink: true }
                                            ].map((item, index) => (
                                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                                    <span className="font-medium text-gray-700">{item.label}:</span>
                                                    {item.isLink && item.value !== 'Not available' ? (
                                                        <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
                                                            Visit Website
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-600">{item.value}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                            <HiAcademicCap className="w-5 h-5 mr-2 text-blue-600" />
                                            Key Features
                                        </h4>
                                        <ul className="space-y-3">
                                            {(college.features || [
                                                'World-class faculty and research facilities',
                                                'Modern campus with advanced infrastructure',
                                                'Strong industry connections and placement opportunities',
                                                'Vibrant campus life with numerous clubs and activities'
                                            ]).map((feature, index) => (
                                                <li key={index} className="flex items-start space-x-3">
                                                    <FaCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-600">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                            <FaTrophy className="w-5 h-5 mr-2 text-yellow-600" />
                                            Achievements
                                        </h4>
                                        <ul className="space-y-3">
                                            {(college.achievements || [
                                                'Ranked among top 50 institutions nationally',
                                                'Award for Excellence in Research 2023',
                                                'Best Student Life Award 2022',
                                                'Green Campus Certification'
                                            ]).map((achievement, index) => (
                                                <li key={index} className="flex items-start space-x-3">
                                                    <FaAward className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-600">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Admission Process Tab */}
                        {activeTab === 'admission' && (
                            <div className="space-y-8">
                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Admission Process</h3>

                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 lg:p-8">
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-gray-700 mb-6">
                                            {college.admissionProcess || `The admission process at ${college.name} is designed to identify talented and motivated students who will thrive in our academic environment.`}
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            {[
                                                { step: 1, title: 'Online Application', desc: 'Submit the application form with required documents' },
                                                { step: 2, title: 'Entrance Examination', desc: 'Take the university entrance test' },
                                                { step: 3, title: 'Interview', desc: 'Personal interview with admission committee' },
                                                { step: 4, title: 'Final Admission', desc: 'Receive admission offer and complete enrollment' }
                                            ].map((item) => (
                                                <div key={item.step} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                                            {item.step}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                                            <h4 className="font-semibold text-gray-800 mb-4">Required Documents</h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
                                                {[
                                                    'High school transcripts',
                                                    'Standardized test scores',
                                                    'Letters of recommendation',
                                                    'Personal statement',
                                                    'Identification documents',
                                                    'Passport size photographs',
                                                    'Proof of English proficiency',
                                                    'Financial documentation'
                                                ].map((doc, index) => (
                                                    <li key={index} className="flex items-center space-x-2">
                                                        <FaCheck className="w-4 h-4 text-green-500" />
                                                        <span>{doc}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center bg-white rounded-2xl p-8 border border-gray-200">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Ready to Apply?</h4>
                                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                        Start your application process today and take the first step towards your future at {college.name}.
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <Link
                                            to="/admission"
                                            className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                                        >
                                            <span>Start Application</span>
                                            <FaArrowRight className="w-4 h-4" />
                                        </Link>
                                        <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2">
                                            <FaDownload className="w-4 h-4" />
                                            <span>Download Brochure</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Events Tab */}
                        {activeTab === 'events' && (
                            <div className="space-y-8">
                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h3>

                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {(college.events || [
                                        {
                                            name: "Tech Fest 2024",
                                            date: "2024-03-15",
                                            description: "Annual technology festival showcasing student innovations and projects.",
                                            type: "Conference"
                                        },
                                        {
                                            name: "Cultural Week",
                                            date: "2024-04-20",
                                            description: "Celebration of cultural diversity with performances, food, and activities.",
                                            type: "Cultural"
                                        },
                                        {
                                            name: "Science Fair",
                                            date: "2024-05-10",
                                            description: "Exhibition of scientific research and experiments by students.",
                                            type: "Academic"
                                        }
                                    ]).map((event, index) => (
                                        <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <span className="text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                                            {event.type}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold">
                                                            {new Date(event.date).getDate()}
                                                        </div>
                                                        <div className="text-sm opacity-90">
                                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h4 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                                                    {event.name}
                                                </h4>
                                                <p className="text-gray-600 mb-4 leading-relaxed">
                                                    {event.description}
                                                </p>
                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <span>{formatDate(event.date)}</span>
                                                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1">
                                                        <span>Learn More</span>
                                                        <FaArrowRight className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {(!college.events || college.events.length === 0) && (
                                    <div className="text-center py-12">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <HiCalendar className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h4 className="text-xl font-semibold text-gray-600 mb-2">No Upcoming Events</h4>
                                        <p className="text-gray-500">Check back later for upcoming events and activities.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sports Tab */}
                        {activeTab === 'sports' && (
                            <div className="space-y-8">
                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Sports Facilities</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(college.sports || [
                                        {
                                            category: "Football",
                                            facilities: "Professional football field with training facilities",
                                            teams: "Varsity and Junior teams",
                                            achievements: "State Champions 2023",
                                            icon: FaFootball
                                        },
                                        {
                                            category: "Basketball",
                                            facilities: "Indoor basketball court with professional flooring",
                                            teams: "Men's and Women's teams",
                                            achievements: "Regional Finals 2023",
                                            icon: FaBasketball
                                        },
                                        {
                                            category: "Baseball",
                                            facilities: "Baseball field with batting cages",
                                            teams: "Varsity and Club teams",
                                            achievements: "Conference Champions 2023",
                                            icon: FaBaseballBatBall
                                        },
                                        {
                                            category: "Table Tennis",
                                            facilities: "Multiple tables with professional equipment",
                                            teams: "Competitive and recreational teams",
                                            achievements: "State Level Participants",
                                            icon: FaTableTennisPaddleBall
                                        },
                                        {
                                            category: "Athletics",
                                            facilities: "Track field and running tracks",
                                            teams: "Track and field teams",
                                            achievements: "Multiple medal winners",
                                            icon: FaPersonRunning
                                        },
                                        {
                                            category: "Volleyball",
                                            facilities: "Indoor and outdoor volleyball courts",
                                            teams: "Men's and Women's teams",
                                            achievements: "Regional Champions 2023",
                                            icon: FaVolleyball         
                                        }
                                    ]).map((sport, index) => {
                                        const SportIcon = sport.icon;
                                        return (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <SportIcon className="w-6 h-6 text-blue-600" />
                                                        <h4 className="text-xl font-semibold text-gray-800">{sport.category}</h4>
                                                    </div>
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                                        Active
                                                    </span>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <span className="font-medium text-gray-700 text-sm flex items-center space-x-1">
                                                            <FaUniversity className="w-3 h-3" />
                                                            <span>Facilities:</span>
                                                        </span>
                                                        <p className="text-gray-600 mt-1">{sport.facilities}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700 text-sm flex items-center space-x-1">
                                                            <HiUsers className="w-3 h-3" />
                                                            <span>Teams:</span>
                                                        </span>
                                                        <p className="text-gray-600 mt-1">{sport.teams}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700 text-sm flex items-center space-x-1">
                                                            <FaTrophy className="w-3 h-3" />
                                                            <span>Achievements:</span>
                                                        </span>
                                                        <p className="text-gray-600 mt-1">{sport.achievements}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Research Tab */}
                        {activeTab === 'research' && (
                            <div className="space-y-8">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 flex items-center">
                                        <FaFlask className="w-8 h-8 mr-3" />
                                        Research & Innovation
                                    </h3>
                                    <p className="text-blue-100 text-lg max-w-3xl">
                                        {college.researchHistory || `${college.name} is at the forefront of innovation with groundbreaking research across multiple disciplines.`}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(college.researchWorks || [
                                        "Artificial Intelligence in Education",
                                        "Sustainable Energy Solutions",
                                        "Machine Learning Applications",
                                        "Blockchain Technology",
                                        "Cybersecurity Innovations",
                                        "Biomedical Engineering"
                                    ]).map((work, index) => (
                                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group hover:border-blue-200">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                                                    <FaFlask className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                                </div>
                                                <span className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    {work}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Research Statistics</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                        {[
                                            { label: 'Ongoing Projects', value: '25+', icon: FaFlask },
                                            { label: 'Publications', value: '150+', icon: FaFileAlt },
                                            { label: 'Research Centers', value: '12', icon: FaUniversity },
                                            { label: 'Industry Partners', value: '45', icon: HiUsers }
                                        ].map((stat, index) => {
                                            const StatIcon = stat.icon;
                                            return (
                                                <div key={index} className="bg-white rounded-xl p-4">
                                                    <StatIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                                                    <div className="text-gray-600 text-sm">{stat.label}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Gallery Tab */}
                        {activeTab === 'gallery' && (
                            <div className="space-y-8">
                                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Campus Gallery</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        { type: 'Campus', image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                                        { type: 'Library', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                                        { type: 'Sports', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                                        { type: 'Labs', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                                        { type: 'Events', image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
                                        { type: 'Student Life', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
                                    ].map((item, index) => (
                                        <div key={index} className="group cursor-pointer">
                                            <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                                                <img
                                                    src={item.image}
                                                    alt={item.type}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-white font-semibold text-lg">{item.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white text-center mb-8">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl lg:text-4xl font-bold mb-4">Ready to Join {college.name}?</h3>
                        <p className="text-blue-100 text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                            Take the first step towards your educational journey at one of the world's leading institutions.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/admission"
                                className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                            >
                                <FaRocket className="w-5 h-5" />
                                <span>Apply Now</span>
                            </Link>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2">
                                <FaDownload className="w-5 h-5" />
                                <span>Download Brochure</span>
                            </button>
                            <button className="border-2 border-white/50 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2">
                                <FaPhone className="w-5 h-5" />
                                <span>Contact Us</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;