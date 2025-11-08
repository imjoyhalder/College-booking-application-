// import { useContext, useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { AuthContext } from '../../Providers/AuthProvider';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// const Navbar = () => {
//     const { user, logOut } = useContext(AuthContext);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const handleLogOut = () => {
//         logOut()
//             .then(() => { })
//             .catch(error => console.log(error));
//     };

//     const navItems = [
//         { path: "/", label: "Home" },
//         { path: "/colleges", label: "Colleges" },
//         { path: "/admission", label: "Admission" },
//         { path: "/my-college", label: "My College" },
//     ];

//     return (
//         <div className="bg-white shadow-lg">
//             <div className="container mx-auto px-4">
//                 <div className="flex justify-between items-center py-4">
//                     {/* Logo */}
//                     <Link to="/" className="text-2xl font-bold text-blue-600">
//                         EduBook
//                     </Link>

//                     {/* Desktop Navigation */}
//                     <div className="hidden lg:flex items-center space-x-8">
//                         {navItems.map(item => (
//                             <NavLink
//                                 key={item.path}
//                                 to={item.path}
//                                 className={({ isActive }) =>
//                                     `font-medium transition-colors duration-200 ${isActive
//                                         ? 'text-blue-600 border-b-2 border-blue-600'
//                                         : 'text-gray-600 hover:text-blue-600'
//                                     }`
//                                 }
//                             >
//                                 {item.label}
//                             </NavLink>
//                         ))}
//                     </div>

//                     {/* User Section */}
//                     <div className="hidden lg:flex items-center space-x-4">
//                         {user ? (
//                             <>
//                                 <Link
//                                     to="/profile"
//                                     className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
//                                 >
//                                     <img
//                                         src={user.photoURL || '/default-avatar.png'}
//                                         alt={user.displayName || 'User'}
//                                         className="w-8 h-8 rounded-full"
//                                     />
//                                     <span>{user.displayName || 'Profile'}</span>
//                                 </Link>
//                                 <button
//                                     onClick={handleLogOut}
//                                     className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//                                 >
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <div className="flex items-center space-x-4">
//                                 <Link
//                                     to="/login"
//                                     className="text-gray-600 hover:text-blue-600 transition-colors"
//                                 >
//                                     Login
//                                 </Link>
//                                 <Link
//                                     to="/register"
//                                     className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                                 >
//                                     Register
//                                 </Link>
//                             </div>
//                         )}
//                     </div>

//                     {/* Mobile menu button */}
//                     <div className="lg:hidden">
//                         <button
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             className="text-gray-600 hover:text-blue-600"
//                         >
//                             {isMenuOpen ? (
//                                 <XMarkIcon className="h-6 w-6" />
//                             ) : (
//                                 <Bars3Icon className="h-6 w-6" />
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Navigation */}
//                 {isMenuOpen && (
//                     <div className="lg:hidden py-4 border-t">
//                         <div className="flex flex-col space-y-4">
//                             {navItems.map(item => (
//                                 <NavLink
//                                     key={item.path}
//                                     to={item.path}
//                                     onClick={() => setIsMenuOpen(false)}
//                                     className={({ isActive }) =>
//                                         `font-medium ${isActive
//                                             ? 'text-blue-600'
//                                             : 'text-gray-600 hover:text-blue-600'
//                                         }`
//                                     }
//                                 >
//                                     {item.label}
//                                 </NavLink>
//                             ))}
//                             {user ? (
//                                 <>
//                                     <Link
//                                         to="/profile"
//                                         onClick={() => setIsMenuOpen(false)}
//                                         className="flex items-center space-x-2 text-gray-600"
//                                     >
//                                         <img
//                                             src={user.photoURL || '/default-avatar.png'}
//                                             alt={user.displayName || 'User'}
//                                             className="w-6 h-6 rounded-full"
//                                         />
//                                         <span>{user.displayName || 'Profile'}</span>
//                                     </Link>
//                                     <button
//                                         onClick={() => {
//                                             handleLogOut();
//                                             setIsMenuOpen(false);
//                                         }}
//                                         className="text-red-500 text-left"
//                                     >
//                                         Logout
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Link
//                                         to="/login"
//                                         onClick={() => setIsMenuOpen(false)}
//                                         className="text-gray-600"
//                                     >
//                                         Login
//                                     </Link>
//                                     <Link
//                                         to="/register"
//                                         onClick={() => setIsMenuOpen(false)}
//                                         className="text-blue-600"
//                                     >
//                                         Register
//                                     </Link>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Navbar;

import { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
    }, [location]);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/colleges", label: "Colleges" },
        { path: "/admission", label: "Admission" },
        { path: "/my-college", label: "My College" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : 'bg-white shadow-sm'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-3">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center space-x-3 group"
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl shadow-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l9 5m-9 5l9-5m-9 5v6" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                EduBook
                            </h1>
                            <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Find Your Future</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `relative px-4 py-2 font-medium rounded-lg transition-all duration-200 group ${isActive
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`
                                }
                            >
                                {item.label}
                                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === item.path ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}></span>
                            </NavLink>
                        ))}
                    </div>

                    {/* User Section */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-xl px-3 py-2 transition-all duration-200 border border-gray-200"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={user.photoURL || '/default-avatar.png'}
                                            alt={user.displayName || 'User'}
                                            className="w-8 h-8 rounded-full border-2 border-blue-200"
                                        />
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-gray-800">
                                                {user.displayName?.split(' ')[0] || 'User'}
                                            </p>
                                            <p className="text-xs text-gray-500">Student</p>
                                        </div>
                                    </div>
                                    <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-800">{user.displayName || 'User'}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>My Profile</span>
                                        </Link>
                                        <Link
                                            to="/my-college"
                                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span>My Applications</span>
                                        </Link>
                                        <div className="border-t border-gray-100 mt-2 pt-2">
                                            <button
                                                onClick={handleLogOut}
                                                className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors border border-gray-200"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="h-6 w-6 text-gray-700" />
                            ) : (
                                <Bars3Icon className="h-6 w-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
                        <div className="py-4 space-y-2">
                            {navItems.map(item => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                        }`
                                    }
                                >
                                    <div className={`w-2 h-2 rounded-full ${location.pathname === item.path ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            ))}
                            
                            {/* Mobile User Section */}
                            <div className="border-t border-gray-200 mt-4 pt-4">
                                {user ? (
                                    <>
                                        <div className="px-4 py-3 flex items-center space-x-3">
                                            <img
                                                src={user.photoURL || '/default-avatar.png'}
                                                alt={user.displayName || 'User'}
                                                className="w-10 h-10 rounded-full border-2 border-blue-200"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800 truncate">
                                                    {user.displayName || 'User'}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>My Profile</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleLogOut();
                                                setIsMenuOpen(false);
                                            }}
                                            className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span>Sign Out</span>
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-2 px-4">
                                        <Link
                                            to="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block w-full text-center px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay for dropdown */}
            {isProfileOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;