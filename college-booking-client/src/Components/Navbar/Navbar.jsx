// Navbar.jsx
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="bg-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        EduBook
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `font-medium transition-colors duration-200 ${isActive
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* User Section */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <img
                                        src={user.photoURL || '/default-avatar.png'}
                                        alt={user.displayName || 'User'}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{user.displayName || 'Profile'}</span>
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-blue-600"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            {navItems.map(item => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `font-medium ${isActive
                                            ? 'text-blue-600'
                                            : 'text-gray-600 hover:text-blue-600'
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center space-x-2 text-gray-600"
                                    >
                                        <img
                                            src={user.photoURL || '/default-avatar.png'}
                                            alt={user.displayName || 'User'}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span>{user.displayName || 'Profile'}</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogOut();
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-red-500 text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-gray-600"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-blue-600"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;