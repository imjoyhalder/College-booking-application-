// SearchBar.jsx
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    placeholder="Search for colleges by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;