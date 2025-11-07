// src/Pages/Admission/Admission.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const Admission = () => {
    const { user } = useContext(AuthContext);
    const [selectedCollege, setSelectedCollege] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        candidateName: user?.displayName || '',
        subject: '',
        email: user?.email || '',
        phone: '',
        address: '',
        dateOfBirth: '',
        image: null
    });

    const colleges = [
        {
            id: 1,
            name: "University of Technology",
            image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            admissionDates: "Fall 2024: Aug 15 - Sep 30",
            deadline: "2024-09-30",
            programs: ["Computer Science", "Engineering", "Business"]
        },
        {
            id: 2,
            name: "Cambridge University",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            admissionDates: "Spring 2024: Jan 10 - Mar 15",
            deadline: "2024-03-15",
            programs: ["Arts", "Sciences", "Medicine"]
        },
        {
            id: 3,
            name: "Stanford University",
            image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            admissionDates: "Winter 2024: Nov 1 - Dec 15",
            deadline: "2024-12-15",
            programs: ["Technology", "Design", "Entrepreneurship"]
        }
    ];

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Application submitted:', { college: selectedCollege, ...formData });
        alert('Application submitted successfully!');
        setShowForm(false);
        setSelectedCollege('');
        setFormData({
            candidateName: user?.displayName || '',
            subject: '',
            email: user?.email || '',
            phone: '',
            address: '',
            dateOfBirth: '',
            image: null
        });
    };

    if (showForm) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                        Application Form
                                    </h1>
                                    <p className="text-gray-600">
                                        Complete your application for {selectedCollege.name}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Application Form */}
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* College Info */}
                                <div className="md:col-span-2">
                                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                                        <img
                                            src={selectedCollege.image}
                                            alt={selectedCollege.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">{selectedCollege.name}</h3>
                                            <p className="text-gray-600">{selectedCollege.admissionDates}</p>
                                            <p className="text-sm text-red-600">
                                                Application deadline: {new Date(selectedCollege.deadline).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="candidateName"
                                        value={formData.candidateName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
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
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    />
                                </div>

                                {/* Academic Information */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Desired Subject/Program *
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a program</option>
                                        {selectedCollege.programs.map(program => (
                                            <option key={program} value={program}>{program}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Document Upload */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload Photo
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleInputChange}
                                            accept="image/*"
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-gray-600 mb-1">Click to upload your photo</p>
                                            <p className="text-gray-500 text-sm">PNG, JPG, JPEG up to 5MB</p>
                                        </label>
                                    </div>
                                    {formData.image && (
                                        <p className="text-green-600 text-sm mt-2">✓ {formData.image.name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
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
                        College Admission
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Apply to your dream colleges with our streamlined admission process. Select a college below to start your application.
                    </p>
                </div>

                {/* Colleges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {colleges.map(college => (
                        <div key={college.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                            <img
                                src={college.image}
                                alt={college.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{college.name}</h3>
                                <p className="text-gray-600 mb-3">{college.admissionDates}</p>

                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Available Programs:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {college.programs.map((program, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                            >
                                                {program}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>Deadline: {new Date(college.deadline).toLocaleDateString()}</span>
                                </div>

                                <button
                                    onClick={() => handleCollegeSelect(college)}
                                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Application Process */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Application Process
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { step: 1, title: "Select College", desc: "Choose from our partner colleges" },
                            { step: 2, title: "Fill Form", desc: "Complete the application form" },
                            { step: 3, title: "Submit", desc: "Review and submit your application" },
                            { step: 4, title: "Track", desc: "Track your application status" }
                        ].map(step => (
                            <div key={step.step} className="text-center">
                                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                    {step.step}
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admission;