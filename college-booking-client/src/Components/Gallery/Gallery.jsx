
import { useState } from 'react';

const Gallery = () => {
    const galleryImages = [
        {
            id: 1,
            src: "https://www.shutterstock.com/image-photo/four-happy-indian-graduate-students-260nw-2594135029.jpg",
            alt: "Graduation Ceremony 2023",
            caption: "Graduation Ceremony 2023 - University of Technology",
            category: "Graduation"
        },
        {
            id: 2,
            src: "https://www.sangenbd.com/images/study-cambridge-university.jpg",
            alt: "Campus Life",
            caption: "Student Life at Cambridge University",
            category: "Campus Life"
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Research Lab",
            caption: "Advanced Research Laboratory - Stanford University",
            category: "Research"
        },
        {
            id: 4,
            src: "https://www.sport.ox.ac.uk/sites/default/files/styles/listing_tile_text_rollover_image/public/sport/images/media/lacrosse_2.jpg?itok=Q9b4OISw",
            alt: "Sports Event",
            caption: "Annual Sports Competition 2023",
            category: "Sports"
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Library",
            caption: "Modern Library Facilities",
            category: "Facilities"
        },
        {
            id: 6,
            src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Cultural Festival",
            caption: "Cultural Diversity Festival 2023",
            category: "Events"
        },
        {
            id: 7,
            src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Classroom Session",
            caption: "Interactive Classroom Learning",
            category: "Academics"
        },
        {
            id: 8,
            src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Student Group",
            caption: "Student Leadership Conference",
            category: "Student Life"
        }
    ];

    const categories = ["All", "Graduation", "Campus Life", "Research", "Sports", "Facilities", "Events", "Academics", "Student Life"];
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredImages = activeCategory === "All" 
        ? galleryImages 
        : galleryImages.filter(image => image.category === activeCategory);

    return (
        <div className="w-full">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            activeCategory === category
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Gallery Grid - Simple Image Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map(image => (
                    <div
                        key={image.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                        {/* Image */}
                        <div className="w-full h-64 overflow-hidden">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                    {image.category}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-gray-800 line-clamp-2">
                                {image.caption}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-600">No images found</h3>
                    <p className="text-gray-500">Try selecting a different category</p>
                </div>
            )}
        </div>
    );
};

export default Gallery;