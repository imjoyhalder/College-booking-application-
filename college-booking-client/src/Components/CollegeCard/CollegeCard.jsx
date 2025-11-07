// CollegeCard.jsx
import { Link } from 'react-router-dom';

const CollegeCard = ({ college }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative">
                <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ {college.rating}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{college.name}</h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">{college.admissionDates}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <span className="text-sm">{college.researchHistory}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                        {college.sports.slice(0, 3).map((sport, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                                {sport}
                            </span>
                        ))}
                        {college.sports.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                +{college.sports.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                <Link
                    to={`/colleges/${college.id}`}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default CollegeCard;