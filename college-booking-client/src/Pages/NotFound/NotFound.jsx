// src/Pages/NotFound/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full text-center">
                {/* Animated 404 */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="text-9xl font-bold text-gray-300 opacity-50">404</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl font-bold text-blue-600 animate-bounce">404</div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">
                            Page Not Found
                        </h1>
                        <p className="text-lg text-gray-600 max-w-md mx-auto">
                            Oops! The page you're looking for seems to have wandered off into the digital wilderness. 
                            Let's get you back on track.
                        </p>
                    </div>

                    {/* Animated Illustration */}
                    <div className="relative h-48 mb-6">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-32 h-32 text-blue-200 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                            <div className="flex space-x-2 animate-bounce">
                                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Go Back
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { path: '/colleges', label: 'Colleges' },
                                { path: '/admission', label: 'Admission' },
                                { path: '/my-college', label: 'My College' },
                                { path: '/profile', label: 'Profile' }
                            ].map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Support Contact */}
                    <div className="pt-6">
                        <p className="text-sm text-gray-500">
                            Need help?{' '}
                            <a
                                href="mailto:support@edubook.com"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-100 rounded-full opacity-50 animate-pulse delay-75"></div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-indigo-100 rounded-full opacity-50 animate-pulse delay-150"></div>
            </div>
        </div>
    );
};

export default NotFound;