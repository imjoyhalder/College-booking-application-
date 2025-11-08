// // src/Pages/Admission/Admission.jsx
// import { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../../Providers/AuthProvider';

// const Admission = () => {
//     const { user } = useContext(AuthContext);
//     const [selectedCollege, setSelectedCollege] = useState('');
//     const [showForm, setShowForm] = useState(false);
//     const [colleges, setColleges] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     const [formData, setFormData] = useState({
//         candidateName: user?.displayName || '',
//         subject: '',
//         email: user?.email || '',
//         phone: '',
//         address: '',
//         dateOfBirth: '',
//         image: null
//     });

//     // Fetch colleges from API
//     useEffect(() => {
//         const fetchColleges = async () => {
//             try {
//                 setLoading(true);
//                 const res = await fetch('http://localhost:5000/api/colleges');
//                 const data = await res.json();

//                 if (data.success) {
//                     setColleges(data.data || []);
//                 } else {
//                     setError('Failed to fetch colleges');
//                 }
//             } catch (error) {
//                 console.error("Error fetching colleges:", error);
//                 setError('Failed to connect to server');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchColleges();
//     }, []);

//     const handleCollegeSelect = (college) => {
//         setSelectedCollege(college);
//         setShowForm(true);
//     };

//     const handleInputChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'image') {
//             setFormData(prev => ({ ...prev, image: files[0] }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         try {
//             // Create application data
//             const applicationData = {
//                 collegeId: selectedCollege._id,
//                 collegeName: selectedCollege.name,
//                 candidateName: formData.candidateName,
//                 subject: formData.subject,
//                 email: formData.email,
//                 phone: formData.phone,
//                 address: formData.address,
//                 dateOfBirth: formData.dateOfBirth,
//                 applicationDate: new Date().toISOString(),
//                 status: 'pending'
//             };

//             // If you want to handle file upload, you'd need to use FormData
//             const formDataToSend = new FormData();
//             formDataToSend.append('data', JSON.stringify(applicationData));
//             if (formData.image) {
//                 formDataToSend.append('image', formData.image);
//             }

//             // Send application to backend
//             const response = await fetch('http://localhost:5000/api/applications', {
//                 method: 'POST',
//                 body: formDataToSend,
//             });

//             const result = await response.json();

//             if (result.success) {
//                 alert('Application submitted successfully!');
//                 setShowForm(false);
//                 setSelectedCollege('');
//                 setFormData({
//                     candidateName: user?.displayName || '',
//                     subject: '',
//                     email: user?.email || '',
//                     phone: '',
//                     address: '',
//                     dateOfBirth: '',
//                     image: null
//                 });
//             } else {
//                 alert('Failed to submit application. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error submitting application:', error);
//             alert('Error submitting application. Please try again.');
//         }
//     };

//     // Generate programs list from college data
//     const getCollegePrograms = (college) => {
//         // You can customize this based on your actual program data structure
//         const defaultPrograms = ["Computer Science", "Engineering", "Business", "Arts", "Sciences"];
        
//         // If college has specific programs in your API, use them
//         // Otherwise use default programs
//         return college.programs || defaultPrograms;
//     };

//     // Loading state
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center">
//                         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                         <p className="text-gray-600 text-lg">Loading colleges...</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center">
//                         <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Colleges</h3>
//                         <p className="text-gray-600 mb-6">{error}</p>
//                         <button
//                             onClick={() => window.location.reload()}
//                             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                             Try Again
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (showForm) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="container mx-auto px-4">
//                     <div className="max-w-4xl mx-auto">
//                         {/* Header */}
//                         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                                         Application Form
//                                     </h1>
//                                     <p className="text-gray-600">
//                                         Complete your application for {selectedCollege.name}
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowForm(false)}
//                                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Application Form */}
//                         <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                                 {/* College Info */}
//                                 <div className="md:col-span-2">
//                                     <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
//                                         <img
//                                             src={selectedCollege.image}
//                                             alt={selectedCollege.name}
//                                             className="w-16 h-16 rounded-lg object-cover"
//                                         />
//                                         <div>
//                                             <h3 className="text-xl font-semibold text-gray-800">{selectedCollege.name}</h3>
//                                             <p className="text-gray-600">{selectedCollege.admissionDates}</p>
//                                             <p className="text-sm text-gray-600">
//                                                 Location: {selectedCollege.location}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Personal Information */}
//                                 <div className="md:col-span-2">
//                                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Full Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="candidateName"
//                                         value={formData.candidateName}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Date of Birth *
//                                     </label>
//                                     <input
//                                         type="date"
//                                         name="dateOfBirth"
//                                         value={formData.dateOfBirth}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Email Address *
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Phone Number *
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="phone"
//                                         value={formData.phone}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Address *
//                                     </label>
//                                     <textarea
//                                         name="address"
//                                         value={formData.address}
//                                         onChange={handleInputChange}
//                                         required
//                                         rows="3"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                                     />
//                                 </div>

//                                 {/* Academic Information */}
//                                 <div className="md:col-span-2">
//                                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Desired Subject/Program *
//                                     </label>
//                                     <select
//                                         name="subject"
//                                         value={formData.subject}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         <option value="">Select a program</option>
//                                         {getCollegePrograms(selectedCollege).map(program => (
//                                             <option key={program} value={program}>{program}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* Document Upload */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Upload Photo
//                                     </label>
//                                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                                         <input
//                                             type="file"
//                                             name="image"
//                                             onChange={handleInputChange}
//                                             accept="image/*"
//                                             className="hidden"
//                                             id="image-upload"
//                                         />
//                                         <label htmlFor="image-upload" className="cursor-pointer">
//                                             <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                             </svg>
//                                             <p className="text-gray-600 mb-1">Click to upload your photo</p>
//                                             <p className="text-gray-500 text-sm">PNG, JPG, JPEG up to 5MB</p>
//                                         </label>
//                                     </div>
//                                     {formData.image && (
//                                         <p className="text-green-600 text-sm mt-2">✓ {formData.image.name}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Submit Button */}
//                             <div className="flex space-x-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowForm(false)}
//                                     className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="flex-1 bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
//                                 >
//                                     Submit Application
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className="container mx-auto px-4">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//                         College Admission
//                     </h1>
//                     <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                         Apply to your dream colleges with our streamlined admission process. Select a college below to start your application.
//                     </p>
//                 </div>

//                 {/* Colleges Grid */}
//                 {colleges.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//                         {colleges.map(college => (
//                             <div key={college._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
//                                 <img
//                                     src={college.image}
//                                     alt={college.name}
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-6">
//                                     <h3 className="text-xl font-bold text-gray-800 mb-2">{college.name}</h3>
//                                     <p className="text-gray-600 mb-3">{college.admissionDates}</p>
                                    
//                                     <div className="flex items-center space-x-2 mb-3">
//                                         <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                         </svg>
//                                         <span className="text-sm text-gray-600">{college.location}</span>
//                                     </div>

//                                     <div className="flex items-center space-x-2 mb-4">
//                                         <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                         </svg>
//                                         <span className="text-sm font-medium text-gray-700">{college.rating}</span>
//                                     </div>

//                                     <button
//                                         onClick={() => handleCollegeSelect(college)}
//                                         className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
//                                     >
//                                         Apply Now
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-12">
//                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-600 mb-2">No Colleges Available</h3>
//                         <p className="text-gray-500">Check back later for admission opportunities.</p>
//                     </div>
//                 )}

//                 {/* Application Process */}
//                 <div className="bg-white rounded-2xl shadow-lg p-8">
//                     <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//                         Application Process
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                         {[
//                             { step: 1, title: "Select College", desc: "Choose from available colleges" },
//                             { step: 2, title: "Fill Form", desc: "Complete the application form" },
//                             { step: 3, title: "Submit", desc: "Review and submit your application" },
//                             { step: 4, title: "Track", desc: "Track your application status" }
//                         ].map(step => (
//                             <div key={step.step} className="text-center">
//                                 <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
//                                     {step.step}
//                                 </div>
//                                 <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
//                                 <p className="text-gray-600 text-sm">{step.desc}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Admission;

// src/Pages/Admission/Admission.jsx
// import { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../../Providers/AuthProvider';

// const Admission = () => {
//     const { user } = useContext(AuthContext);
//     const [selectedCollege, setSelectedCollege] = useState('');
//     const [showForm, setShowForm] = useState(false);
//     const [colleges, setColleges] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [submitting, setSubmitting] = useState(false);
    
//     const [formData, setFormData] = useState({
//         candidateName: user?.displayName || '',
//         subject: '',
//         email: user?.email || '',
//         phone: '',
//         address: '',
//         dateOfBirth: '',
//         image: null
//     });

//     // Fetch colleges from API
//     useEffect(() => {
//         const fetchColleges = async () => {
//             try {
//                 setLoading(true);
//                 const res = await fetch('http://localhost:5000/api/colleges');
//                 const data = await res.json();

//                 if (data.success) {
//                     setColleges(data.data || []);
//                 } else {
//                     setError('Failed to fetch colleges');
//                 }
//             } catch (error) {
//                 console.error("Error fetching colleges:", error);
//                 setError('Failed to connect to server');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchColleges();
//     }, []);

//     const handleCollegeSelect = (college) => {
//         setSelectedCollege(college);
//         setShowForm(true);
//     };

//     const handleInputChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'image') {
//             setFormData(prev => ({ ...prev, image: files[0] }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);
        
//         try {
//             // Create FormData for file upload
//             const formDataToSend = new FormData();
            
//             // Add application data
//             formDataToSend.append('collegeId', selectedCollege._id);
//             formDataToSend.append('collegeName', selectedCollege.name);
//             formDataToSend.append('applicantName', formData.candidateName);
//             formDataToSend.append('subject', formData.subject);
//             formDataToSend.append('email', formData.email);
//             formDataToSend.append('phone', formData.phone);
//             formDataToSend.append('address', formData.address);
//             formDataToSend.append('dateOfBirth', formData.dateOfBirth);
            
//             // Add image if exists
//             if (formData.image) {
//                 formDataToSend.append('image', formData.image);
//             }

//             // Send application to backend
//             const response = await fetch('http://localhost:5000/api/application', {
//                 method: 'POST',
//                 body: formDataToSend,
//                 // Don't set Content-Type header for FormData, browser will set it automatically
//             });

//             const result = await response.json();

//             if (result.success) {
//                 alert('Application submitted successfully!');
//                 setShowForm(false);
//                 setSelectedCollege('');
//                 setFormData({
//                     candidateName: user?.displayName || '',
//                     subject: '',
//                     email: user?.email || '',
//                     phone: '',
//                     address: '',
//                     dateOfBirth: '',
//                     image: null
//                 });
//             } else {
//                 alert(result.message || 'Failed to submit application. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error submitting application:', error);
//             alert('Error submitting application. Please try again.');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     // Generate programs list from college data
//     const getCollegePrograms = (college) => {
//         // You can customize this based on your actual program data structure
//         const defaultPrograms = [
//             "Computer Science", 
//             "Engineering", 
//             "Business Administration", 
//             "Arts", 
//             "Sciences",
//             "Medicine",
//             "Law",
//             "Architecture"
//         ];
        
//         // If college has specific programs in your API, use them
//         // Otherwise use default programs
//         return college.programs || defaultPrograms;
//     };

//     // Loading state
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center">
//                         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                         <p className="text-gray-600 text-lg">Loading colleges...</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center">
//                         <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Colleges</h3>
//                         <p className="text-gray-600 mb-6">{error}</p>
//                         <button
//                             onClick={() => window.location.reload()}
//                             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                             Try Again
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (showForm) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="container mx-auto px-4">
//                     <div className="max-w-4xl mx-auto">
//                         {/* Header */}
//                         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                                         Application Form
//                                     </h1>
//                                     <p className="text-gray-600">
//                                         Complete your application for {selectedCollege.name}
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowForm(false)}
//                                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                                     disabled={submitting}
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Application Form */}
//                         <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                                 {/* College Info */}
//                                 <div className="md:col-span-2">
//                                     <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
//                                         <img
//                                             src={selectedCollege.image}
//                                             alt={selectedCollege.name}
//                                             className="w-16 h-16 rounded-lg object-cover"
//                                         />
//                                         <div>
//                                             <h3 className="text-xl font-semibold text-gray-800">{selectedCollege.name}</h3>
//                                             <p className="text-gray-600">{selectedCollege.admissionDates}</p>
//                                             <p className="text-sm text-gray-600">
//                                                 Location: {selectedCollege.location}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Personal Information */}
//                                 <div className="md:col-span-2">
//                                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Full Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="candidateName"
//                                         value={formData.candidateName}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Date of Birth *
//                                     </label>
//                                     <input
//                                         type="date"
//                                         name="dateOfBirth"
//                                         value={formData.dateOfBirth}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Email Address *
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Phone Number *
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="phone"
//                                         value={formData.phone}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Address *
//                                     </label>
//                                     <textarea
//                                         name="address"
//                                         value={formData.address}
//                                         onChange={handleInputChange}
//                                         required
//                                         rows="3"
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 {/* Academic Information */}
//                                 <div className="md:col-span-2">
//                                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Desired Subject/Program *
//                                     </label>
//                                     <select
//                                         name="subject"
//                                         value={formData.subject}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     >
//                                         <option value="">Select a program</option>
//                                         {getCollegePrograms(selectedCollege).map(program => (
//                                             <option key={program} value={program}>{program}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* Document Upload */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Upload Photo
//                                     </label>
//                                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                                         <input
//                                             type="file"
//                                             name="image"
//                                             onChange={handleInputChange}
//                                             accept="image/*"
//                                             className="hidden"
//                                             id="image-upload"
//                                             disabled={submitting}
//                                         />
//                                         <label 
//                                             htmlFor="image-upload" 
//                                             className={`cursor-pointer ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                                         >
//                                             <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                             </svg>
//                                             <p className="text-gray-600 mb-1">Click to upload your photo</p>
//                                             <p className="text-gray-500 text-sm">PNG, JPG, JPEG up to 5MB</p>
//                                         </label>
//                                     </div>
//                                     {formData.image && (
//                                         <p className="text-green-600 text-sm mt-2">✓ {formData.image.name}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Submit Button */}
//                             <div className="flex space-x-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowForm(false)}
//                                     disabled={submitting}
//                                     className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={submitting}
//                                     className="flex-1 bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
//                                 >
//                                     {submitting ? (
//                                         <>
//                                             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                                             Submitting...
//                                         </>
//                                     ) : (
//                                         'Submit Application'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className="container mx-auto px-4">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//                         College Admission
//                     </h1>
//                     <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                         Apply to your dream colleges with our streamlined admission process. Select a college below to start your application.
//                     </p>
//                 </div>

//                 {/* Colleges Grid */}
//                 {colleges.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//                         {colleges.map(college => (
//                             <div key={college._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
//                                 <img
//                                     src={college.image}
//                                     alt={college.name}
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-6">
//                                     <h3 className="text-xl font-bold text-gray-800 mb-2">{college.name}</h3>
//                                     <p className="text-gray-600 mb-3">{college.admissionDates}</p>
                                    
//                                     <div className="flex items-center space-x-2 mb-3">
//                                         <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                         </svg>
//                                         <span className="text-sm text-gray-600">{college.location}</span>
//                                     </div>

//                                     <div className="flex items-center space-x-2 mb-4">
//                                         <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                         </svg>
//                                         <span className="text-sm font-medium text-gray-700">{college.rating}</span>
//                                     </div>

//                                     <button
//                                         onClick={() => handleCollegeSelect(college)}
//                                         className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
//                                     >
//                                         Apply Now
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-12">
//                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-600 mb-2">No Colleges Available</h3>
//                         <p className="text-gray-500">Check back later for admission opportunities.</p>
//                     </div>
//                 )}

//                 {/* Application Process */}
//                 <div className="bg-white rounded-2xl shadow-lg p-8">
//                     <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//                         Application Process
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                         {[
//                             { step: 1, title: "Select College", desc: "Choose from available colleges" },
//                             { step: 2, title: "Fill Form", desc: "Complete the application form" },
//                             { step: 3, title: "Submit", desc: "Review and submit your application" },
//                             { step: 4, title: "Track", desc: "Track your application status" }
//                         ].map(step => (
//                             <div key={step.step} className="text-center">
//                                 <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
//                                     {step.step}
//                                 </div>
//                                 <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
//                                 <p className="text-gray-600 text-sm">{step.desc}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Admission;


// src/Pages/Admission/Admission.jsx
// import { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../../Providers/AuthProvider';
// import { useNavigate } from 'react-router-dom';

// const Admission = () => {
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [selectedCollege, setSelectedCollege] = useState('');
//     const [showForm, setShowForm] = useState(false);
//     const [colleges, setColleges] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [submitting, setSubmitting] = useState(false);
    
//     const [formData, setFormData] = useState({
//         applicantName: user?.displayName || '',
//         subject: '',
//         email: user?.email || '',
//         phone: '',
//         address: '',
//         dateOfBirth: '',
//         image: null
//     });

//     // Redirect if not logged in
//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user, navigate]);

//     // Fetch colleges from API
//     useEffect(() => {
//         const fetchColleges = async () => {
//             try {
//                 setLoading(true);
//                 const res = await fetch('http://localhost:5000/api/colleges');
//                 const data = await res.json();

//                 if (data.success) {
//                     setColleges(data.data || []);
//                 } else {
//                     setError('Failed to fetch colleges');
//                 }
//             } catch (error) {
//                 console.error("Error fetching colleges:", error);
//                 setError('Failed to connect to server');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchColleges();
//     }, []);

//     const handleCollegeSelect = (college) => {
//         setSelectedCollege(college);
//         setShowForm(true);
//     };

//     const handleInputChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'image') {
//             setFormData(prev => ({ ...prev, image: files[0] }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!user) {
//             alert('Please login to submit application');
//             navigate('/login');
//             return;
//         }

//         setSubmitting(true);
        
//         try {
//             // Validate required fields
//             const requiredFields = ['applicantName', 'subject', 'email', 'phone', 'address', 'dateOfBirth'];
//             const missingFields = requiredFields.filter(field => !formData[field]);
            
//             if (missingFields.length > 0) {
//                 alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
//                 setSubmitting(false);
//                 return;
//             }

//             if (!selectedCollege || !selectedCollege._id) {
//                 alert('College information is missing. Please try again.');
//                 setSubmitting(false);
//                 return;
//             }

//             // Prepare admission data for authenticated endpoint
//             const admissionData = {
//                 college: selectedCollege._id, // Note: using 'college' field instead of 'collegeId'
//                 applicantName: formData.applicantName,
//                 subject: formData.subject,
//                 email: formData.email,
//                 phone: formData.phone,
//                 address: formData.address,
//                 dateOfBirth: formData.dateOfBirth
//             };

//             console.log('Submitting admission data:', admissionData);

//             // Get auth token (you might need to adjust this based on your auth implementation)
//             const token = localStorage.getItem('token') || user.token;

//             // Send admission to authenticated endpoint
//             const response = await fetch('http://localhost:5000/api/admissions', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(admissionData)
//             });

//             const result = await response.json();
//             console.log('Server response:', result);

//             if (result.success) {
//                 alert('Application submitted successfully!');
//                 setShowForm(false);
//                 setSelectedCollege('');
//                 setFormData({
//                     applicantName: user?.displayName || '',
//                     subject: '',
//                     email: user?.email || '',
//                     phone: '',
//                     address: '',
//                     dateOfBirth: '',
//                     image: null
//                 });
                
//                 // Redirect to my admissions page or show success message
//                 navigate('/my-admissions');
//             } else {
//                 alert(result.message || 'Failed to submit application. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error submitting application:', error);
//             alert('Error submitting application. Please try again.');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     // Generate programs list from college data
//     const getCollegePrograms = (college) => {
//         const defaultPrograms = [
//             "Computer Science", 
//             "Engineering", 
//             "Business Administration", 
//             "Arts", 
//             "Sciences",
//             "Medicine",
//             "Law",
//             "Architecture"
//         ];
        
//         return college.programs || defaultPrograms;
//     };

//     // Loading state
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center">
//                         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                         <p className="text-gray-600 text-lg">Loading colleges...</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center">
//                         <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Colleges</h3>
//                         <p className="text-gray-600 mb-6">{error}</p>
//                         <button
//                             onClick={() => window.location.reload()}
//                             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                             Try Again
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (showForm) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="container mx-auto px-4">
//                     <div className="max-w-4xl mx-auto">
//                         {/* Header */}
//                         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                                         Application Form
//                                     </h1>
//                                     <p className="text-gray-600">
//                                         Complete your application for {selectedCollege.name}
//                                     </p>
//                                     {user && (
//                                         <p className="text-sm text-green-600 mt-1">
//                                             ✓ Logged in as {user.email}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <button
//                                     onClick={() => setShowForm(false)}
//                                     className="text-gray-400 hover:text-gray-600 transition-colors"
//                                     disabled={submitting}
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Application Form */}
//                         <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                                 {/* College Info */}
//                                 <div className="md:col-span-2">
//                                     <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
//                                         <img
//                                             src={selectedCollege.image}
//                                             alt={selectedCollege.name}
//                                             className="w-16 h-16 rounded-lg object-cover"
//                                         />
//                                         <div>
//                                             <h3 className="text-xl font-semibold text-gray-800">{selectedCollege.name}</h3>
//                                             <p className="text-gray-600">{selectedCollege.admissionDates}</p>
//                                             <p className="text-sm text-gray-600">
//                                                 Location: {selectedCollege.location}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Personal Information */}
//                                 <div className="md:col-span-2">
//                                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Full Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="applicantName"
//                                         value={formData.applicantName}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Date of Birth *
//                                     </label>
//                                     <input
//                                         type="date"
//                                         name="dateOfBirth"
//                                         value={formData.dateOfBirth}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Email Address *
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Phone Number *
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="phone"
//                                         value={formData.phone}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Address *
//                                     </label>
//                                     <textarea
//                                         name="address"
//                                         value={formData.address}
//                                         onChange={handleInputChange}
//                                         required
//                                         rows="3"
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     />
//                                 </div>

//                                 {/* Academic Information */}
//                                 <div className="md:col-span-2">
//                                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Desired Subject/Program *
//                                     </label>
//                                     <select
//                                         name="subject"
//                                         value={formData.subject}
//                                         onChange={handleInputChange}
//                                         required
//                                         disabled={submitting}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                     >
//                                         <option value="">Select a program</option>
//                                         {getCollegePrograms(selectedCollege).map(program => (
//                                             <option key={program} value={program}>{program}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Submit Button */}
//                             <div className="flex space-x-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowForm(false)}
//                                     disabled={submitting}
//                                     className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={submitting}
//                                     className="flex-1 bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
//                                 >
//                                     {submitting ? (
//                                         <>
//                                             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                                             Submitting...
//                                         </>
//                                     ) : (
//                                         'Submit Application'
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8">
//             <div className="container mx-auto px-4">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//                         College Admission
//                     </h1>
//                     <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                         Apply to your dream colleges with our streamlined admission process. Select a college below to start your application.
//                     </p>
//                     {!user && (
//                         <div className="mt-4 p-4 bg-yellow-50 rounded-lg max-w-md mx-auto">
//                             <p className="text-yellow-700">
//                                 Please login to submit applications
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Colleges Grid */}
//                 {colleges.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//                         {colleges.map(college => (
//                             <div key={college._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
//                                 <img
//                                     src={college.image}
//                                     alt={college.name}
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-6">
//                                     <h3 className="text-xl font-bold text-gray-800 mb-2">{college.name}</h3>
//                                     <p className="text-gray-600 mb-3">{college.admissionDates}</p>
                                    
//                                     <div className="flex items-center space-x-2 mb-3">
//                                         <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                         </svg>
//                                         <span className="text-sm text-gray-600">{college.location}</span>
//                                     </div>

//                                     <div className="flex items-center space-x-2 mb-4">
//                                         <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                                         </svg>
//                                         <span className="text-sm font-medium text-gray-700">{college.rating}</span>
//                                     </div>

//                                     <button
//                                         onClick={() => handleCollegeSelect(college)}
//                                         disabled={!user}
//                                         className={`w-full py-3 rounded-lg font-semibold transition-colors ${
//                                             user 
//                                                 ? 'bg-blue-500 text-white hover:bg-blue-600' 
//                                                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                         }`}
//                                     >
//                                         {user ? 'Apply Now' : 'Login to Apply'}
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-12">
//                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-600 mb-2">No Colleges Available</h3>
//                         <p className="text-gray-500">Check back later for admission opportunities.</p>
//                     </div>
//                 )}

//                 {/* Application Process */}
//                 <div className="bg-white rounded-2xl shadow-lg p-8">
//                     <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//                         Application Process
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                         {[
//                             { step: 1, title: "Login", desc: "Sign in to your account" },
//                             { step: 2, title: "Select College", desc: "Choose from available colleges" },
//                             { step: 3, title: "Fill Form", desc: "Complete the application form" },
//                             { step: 4, title: "Submit", desc: "Review and submit your application" }
//                         ].map(step => (
//                             <div key={step.step} className="text-center">
//                                 <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
//                                     {step.step}
//                                 </div>
//                                 <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
//                                 <p className="text-gray-600 text-sm">{step.desc}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Admission;

// src/Pages/Admission/Admission.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admission = () => {
    const navigate = useNavigate();
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        applicantName: '',
        subject: '',
        email: '',
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
                const res = await fetch('http://localhost:5000/api/colleges');
                const data = await res.json();
                if (data.success) {
                    setColleges(data.data || []);
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

    const handleCollegeSelect = (college) => {
        setSelectedCollege(college);
        setShowForm(true);
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

        const requiredFields = ['applicantName', 'subject', 'email', 'phone', 'address', 'dateOfBirth'];
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
                user: formData.email || formData.applicantName, // simple identifier
                college: selectedCollege._id,
                candidateName: formData.applicantName,
                subject: formData.subject,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                dateOfBirth: formData.dateOfBirth
            };

            console.log('Submitting:', admissionData);

            const response = await fetch('http://localhost:5000/api/admissions', {
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
                    applicantName: '',
                    subject: '',
                    email: '',
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
            "Computer Science", "Engineering", "Business Administration",
            "Arts", "Sciences", "Medicine", "Law", "Architecture"
        ];
        return college?.programs || defaultPrograms;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin h-16 w-16 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
                    <p>Loading colleges...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Retry
                </button>
            </div>
        );
    }

    if (showForm && selectedCollege) {
        return (
            <div className="min-h-screen py-8 bg-gray-50">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">Application Form</h2>
                    <p className="mb-4">Apply to <strong>{selectedCollege.name}</strong></p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="applicantName"
                            placeholder="Full Name"
                            value={formData.applicantName}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                        <textarea
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border rounded"
                        />
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border rounded"
                        >
                            <option value="">Select Program</option>
                            {getCollegePrograms(selectedCollege).map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="flex-1 py-3 bg-gray-300 rounded hover:bg-gray-400"
                                disabled={submitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center">College Admission</h1>
                {colleges.length === 0 ? (
                    <p className="text-center text-gray-500">No colleges available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {colleges.map(c => (
                            <div key={c._id} className="bg-white rounded shadow hover:shadow-lg overflow-hidden">
                                <img src={c.image} alt={c.name} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-1">{c.name}</h3>
                                    <p className="text-gray-600 mb-2">{c.admissionDates}</p>
                                    <p className="text-gray-500 mb-4">{c.location}</p>
                                    <button
                                        onClick={() => handleCollegeSelect(c)}
                                        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admission;
