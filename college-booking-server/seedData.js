// seedData.js
import mongoose from 'mongoose';
import College from './models/College.js';
import dotenv from 'dotenv';

dotenv.config();

const colleges = [
    {
        name: "University of Technology",
        image: "https://images.unsplash.com/photo-1562774053-701939374585",
        description: "Premier institution for technology and innovation",
        location: "New York, USA",
        established: 1950,
        students: "15,000+",
        faculty: "1,200+",
        campusSize: "200 acres",
        accreditation: "Internationally Accredited",
        rating: 4.5,
        researchCount: 12,
        admissionDates: "Fall 2024: Aug 15 - Sep 30",
        events: [
            {
                name: "Tech Fest 2024",
                date: new Date('2024-03-15'),
                description: "Annual technology festival showcasing student innovations"
            }
        ],
        sports: [
            {
                category: "Football",
                facilities: "Professional football field",
                teams: "Varsity and Junior teams",
                achievements: "State Champions 2023"
            }
        ],
        researchWorks: [
            "Artificial Intelligence in Education",
            "Sustainable Energy Solutions"
        ],
        admissionProcess: "Complete online application, submit documents, attend interview"
    }
    // Add more colleges...
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await College.deleteMany();
        await College.create(colleges);
        console.log('Data seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();