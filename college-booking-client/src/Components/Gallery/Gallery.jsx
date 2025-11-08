// import { useState } from 'react';

// const Gallery = () => {
//     const [selectedImage, setSelectedImage] = useState(null);

//     const galleryImages = [
//         {
//             id: 1,
//             src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//             alt: "Graduation Ceremony 2023",
//             caption: "Graduation Ceremony 2023 - University of Technology",
//             category: "Graduation"
//         },
//         {
//             id: 2,
//             src: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//             alt: "Campus Life",
//             caption: "Student Life at Cambridge University",
//             category: "Campus Life"
//         },
//         {
//             id: 3,
//             src: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//             alt: "Research Lab",
//             caption: "Advanced Research Laboratory - Stanford University",
//             category: "Research"
//         },
//         {
//             id: 4,
//             src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//             alt: "Sports Event",
//             caption: "Annual Sports Competition 2023",
//             category: "Sports"
//         },
//         {
//             id: 5,
//             src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//             alt: "Library",
//             caption: "Modern Library Facilities",
//             category: "Facilities"
//         },
//         {
//             id: 6,
//             src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//             alt: "Cultural Festival",
//             caption: "Cultural Diversity Festival 2023",
//             category: "Events"
//         },
//         {
//             id: 7,
//             src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//             alt: "Classroom Session",
//             caption: "Interactive Classroom Learning",
//             category: "Academics"
//         },
//         {
//             id: 8,
//             src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//             alt: "Student Group",
//             caption: "Student Leadership Conference",
//             category: "Student Life"
//         }
//     ];

//     const categories = ["All", "Graduation", "Campus Life", "Research", "Sports", "Facilities", "Events", "Academics", "Student Life"];
//     const [activeCategory, setActiveCategory] = useState("All");

//     const filteredImages = activeCategory === "All"
//         ? galleryImages
//         : galleryImages.filter(image => image.category === activeCategory);

//     const openLightbox = (image) => {
//         setSelectedImage(image);
//         document.body.style.overflow = 'hidden';
//     };

//     const closeLightbox = () => {
//         setSelectedImage(null);
//         document.body.style.overflow = 'unset';
//     };

//     // Handle keyboard navigation
//     const handleKeyDown = (e) => {
//         if (!selectedImage) return;

//         if (e.key === 'Escape') {
//             closeLightbox();
//         } else if (e.key === 'ArrowLeft') {
//             const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
//             const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
//             setSelectedImage(filteredImages[prevIndex]);
//         } else if (e.key === 'ArrowRight') {
//             const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
//             const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
//             setSelectedImage(filteredImages[nextIndex]);
//         }
//     };

//     // Add event listener for keyboard navigation
//     useState(() => {
//         if (selectedImage) {
//             document.addEventListener('keydown', handleKeyDown);
//             return () => document.removeEventListener('keydown', handleKeyDown);
//         }
//     }, [selectedImage]);

//     return (
//         <div className="w-full">
//             {/* Category Filter */}
//             <div className="flex flex-wrap justify-center gap-2 mb-8">
//                 {categories.map(category => (
//                     <button
//                         key={category}
//                         onClick={() => setActiveCategory(category)}
//                         className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
//                                 ? 'bg-blue-600 text-white shadow-lg'
//                                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                             }`}
//                     >
//                         {category}
//                     </button>
//                 ))}
//             </div>

//             {/* Gallery Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {filteredImages.map(image => (
//                     <div
//                         key={image.id}
//                         className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-gray-100"
//                         onClick={() => openLightbox(image)}
//                     >
//                         {/* Fixed Image Container */}
//                         <div className="w-full h-64 relative overflow-hidden">
//                             <img
//                                 src={image.src}
//                                 alt={image.alt}
//                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                                 loading="lazy"
//                             />
//                         </div>

//                         {/* Overlay */}
//                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
//                             <div className="p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
//                                 <div className="bg-white rounded-lg p-3 shadow-lg">
//                                     <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
//                                         {image.category}
//                                     </span>
//                                     <p className="text-sm font-medium text-gray-800 mt-2 line-clamp-2">
//                                         {image.caption}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* View Icon */}
//                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
//                                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v0" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Empty State */}
//             {filteredImages.length === 0 && (
//                 <div className="text-center py-12">
//                     <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <h3 className="text-lg font-semibold text-gray-600">No images found</h3>
//                     <p className="text-gray-500">Try selecting a different category</p>
//                 </div>
//             )}

//             {/* Lightbox Modal */}
//             {selectedImage && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
//                     onClick={closeLightbox}
//                 >
//                     <div
//                         className="relative max-w-6xl w-full max-h-full"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         {/* Close Button */}
//                         <button
//                             onClick={closeLightbox}
//                             className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
//                         >
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>

//                         {/* Image Container */}
//                         <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
//                             <div className="flex justify-center items-center bg-gray-900">
//                                 <img
//                                     src={selectedImage.src}
//                                     alt={selectedImage.alt}
//                                     className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
//                                 />
//                             </div>
//                             <div className="p-6">
//                                 <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
//                                     {selectedImage.category}
//                                 </span>
//                                 <p className="text-gray-800 font-medium text-lg">{selectedImage.caption}</p>
//                             </div>
//                         </div>

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between items-center mt-6 px-4">
//                             <button
//                                 onClick={() => {
//                                     const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
//                                     const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
//                                     setSelectedImage(filteredImages[prevIndex]);
//                                 }}
//                                 className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 font-medium"
//                             >
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                                 </svg>
//                                 <span>Previous</span>
//                             </button>

//                             <div className="text-white text-sm font-medium">
//                                 {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length}
//                             </div>

//                             <button
//                                 onClick={() => {
//                                     const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
//                                     const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
//                                     setSelectedImage(filteredImages[nextIndex]);
//                                 }}
//                                 className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 font-medium"
//                             >
//                                 <span>Next</span>
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Gallery;

import { useState } from 'react';

const Gallery = () => {
    const galleryImages = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            alt: "Graduation Ceremony 2023",
            caption: "Graduation Ceremony 2023 - University of Technology",
            category: "Graduation"
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
            src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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