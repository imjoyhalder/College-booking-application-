
import { Link } from 'react-router-dom';
import {
    FaStar,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaFlask,
    FaGraduationCap,
    FaUsers,
    FaUniversity
} from 'react-icons/fa';

const CollegeCard = ({ college }) => {
    // Format established year
    const getEstablishedYear = (established) => {
        return established || 'N/A';
    };

    // Get first few research works
    const getResearchPreview = (researchWorks) => {
        if (!researchWorks || researchWorks.length === 0) {
            return 'Research programs available';
        }
        return researchWorks.slice(0, 2).join(', ');
    };

    // Get sports categories
    const getSportsCategories = (sports) => {
        if (!sports || sports.length === 0) {
            return [];
        }
        return sports.map(sport => sport.category);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            {/* Image Section */}
            <div className="relative">
                <img
                    src={college.image || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                    alt={college.name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <FaStar className="w-4 h-4" />
                    <span>{college.rating || 'N/A'}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="text-white text-sm font-medium">
                        Est. {getEstablishedYear(college.established)}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* College Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    {college.name}
                </h3>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                        <FaGraduationCap className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm font-medium">{college.students || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <FaUsers className="w-4 h-4 mr-2 text-green-500" />
                        <span className="text-sm font-medium">{college.faculty || 'N/A'}</span>
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-3 mb-4">
                    <div className="flex items-start text-gray-600">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{college.location || 'Location not specified'}</span>
                    </div>

                    <div className="flex items-start text-gray-600">
                        <FaCalendarAlt className="w-4 h-4 mr-2 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{college.admissionDates || 'Check website for dates'}</span>
                    </div>

                    <div className="flex items-start text-gray-600">
                        <FaFlask className="w-4 h-4 mr-2 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed line-clamp-2">
                            {getResearchPreview(college.researchWorks)}
                        </span>
                    </div>

                    {college.campusSize && (
                        <div className="flex items-center text-gray-600">
                            <FaUniversity className="w-4 h-4 mr-2 text-indigo-500" />
                            <span className="text-sm">{college.campusSize}</span>
                        </div>
                    )}
                </div>

                {/* Sports Tags */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {getSportsCategories(college.sports).slice(0, 3).map((sport, index) => (
                            <span
                                key={index}
                                className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-200"
                            >
                                {sport}
                            </span>
                        ))}
                        {college.sports && college.sports.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                                +{college.sports.length - 3} more
                            </span>
                        )}
                        {(!college.sports || college.sports.length === 0) && (
                            <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">
                                Sports facilities
                            </span>
                        )}
                    </div>
                </div>

                {/* Research Count Badge */}
                {college.researchCount && (
                    <div className="mb-4">
                        <div className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium border border-green-200">
                            <FaFlask className="w-3 h-3 mr-1" />
                            {college.researchCount}+ Research Papers
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <Link
                    to={`/colleges/${college._id}`}
                    className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default CollegeCard;