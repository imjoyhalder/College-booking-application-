// seedData.js
// import mongoose from 'mongoose';
// import College from './models/College.js';
// import dotenv from 'dotenv';
const mongoose = require('mongoose')
const College = require('./models/College.js')
const dotenv = require('dotenv')

dotenv.config();

const colleges = [
    {
        name: "Cambridge Institute of Technology",
        image:
            "https://qs-igauge.blr1.cdn.digitaloceanspaces.com/1709288970mainbuilding.webp",
        description:
            "A global leader in research and education with a strong academic tradition.",
        location: "Cambridge, UK",
        established: 1904,
        students: "20,000+",
        faculty: "1,000+",
        campusSize: "250 acres",
        accreditation: "UK Higher Education Authority",
        rating: 4.8,
        researchCount: 28,
        admissionDates: "Spring 2024: Jan 10 - Mar 15",
        events: [
            {
                name: "Innovation Summit",
                date: new Date("2024-04-10"),
                description:
                    "A global conference bringing together innovators and researchers."
            }
        ],
        sports: [
            {
                category: "Rowing",
                facilities: "Cam River Boathouse",
                teams: "Men’s and Women’s Rowing Crews",
                achievements: "National Rowing Cup 2022"
            }
        ],
        researchWorks: ["Quantum Computing Advances", "Climate Change Modeling"],
        admissionProcess:
            "Submit online form, provide academic transcripts, complete aptitude test."
    },
    {
        name: "Stanford College of Engineering",
        image:
            "https://soeithelp.stanford.edu/sites/g/files/sbiybj26301/files/styles/breakpoint_2xl_2x/public/media/image/soe_seq.png?itok=xbFuhPDE",
        description:
            "Renowned for excellence in AI, computer science, and engineering disciplines.",
        location: "California, USA",
        established: 1885,
        students: "17,500+",
        faculty: "1,500+",
        campusSize: "300 acres",
        accreditation: "ABET Certified",
        rating: 4.9,
        researchCount: 35,
        admissionDates: "Winter 2024: Nov 1 - Dec 15",
        events: [
            {
                name: "Startup Expo 2024",
                date: new Date("2024-05-20"),
                description: "Annual exhibition of student-led startups and prototypes."
            }
        ],
        sports: [
            {
                category: "Basketball",
                facilities: "Indoor arena and training complex",
                teams: "Men’s and Women’s teams",
                achievements: "NCAA Final Four 2023"
            }
        ],
        researchWorks: ["Autonomous Vehicle Systems", "Neural Network Optimization"],
        admissionProcess:
            "Apply online, provide recommendation letters, participate in interview."
    },
    {
        name: "Oxford School of Humanities",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7PR520RykI16fmzOrEXENJ7QOdYAdrhUkXQ&s",
        description:
            "World-class humanities and arts programs fostering creativity and scholarship.",
        location: "Oxford, UK",
        established: 1821,
        students: "14,000+",
        faculty: "800+",
        campusSize: "180 acres",
        accreditation: "British Education Council",
        rating: 4.7,
        researchCount: 18,
        admissionDates: "Autumn 2024: Sep 1 - Oct 20",
        events: [
            {
                name: "Literature Week 2024",
                date: new Date("2024-09-12"),
                description: "Week-long celebration of global literature and poetry."
            }
        ],
        sports: [
            {
                category: "Cricket",
                facilities: "Historic Oxford Cricket Grounds",
                teams: "University and Alumni teams",
                achievements: "Inter-University Champions 2022"
            }
        ],
        researchWorks: ["Cultural Anthropology", "Modern Linguistics"],
        admissionProcess: "Online application, essay submission, personal interview."
    },
    {
        name: "Harvard Business Academy",
        image:
            "https://www.stacyblackman.com/wp-content/uploads/HBS-Harvard-Business-School-Baker_library-cropped-scaled.jpg",
        description:
            "A premier global hub for leadership, business management, and finance education.",
        location: "Boston, USA",
        established: 1908,
        students: "25,000+",
        faculty: "1,600+",
        campusSize: "210 acres",
        accreditation: "AACSB Accredited",
        rating: 4.9,
        researchCount: 40,
        admissionDates: "Summer 2024: May 1 - Jun 30",
        events: [
            {
                name: "Global Business Forum",
                date: new Date("2024-06-10"),
                description:
                    "An international conference featuring industry leaders and scholars."
            }
        ],
        sports: [
            {
                category: "Tennis",
                facilities: "Outdoor and indoor courts",
                teams: "Men’s and Women’s",
                achievements: "Harvard Open Winners 2023"
            }
        ],
        researchWorks: ["Corporate Strategy Models", "Behavioral Economics"],
        admissionProcess:
            "Submit GMAT scores, provide references, and attend virtual interview."
    },
    {
        name: "Tokyo Institute of Technology",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY2_izZbpSYQYJaZHFi_6WUxb0dpef9-GSCg&s",
        description:
            "Asia’s leading institute for technology and research-based education.",
        location: "Tokyo, Japan",
        established: 1881,
        students: "18,000+",
        faculty: "1,100+",
        campusSize: "240 acres",
        accreditation: "Japanese Ministry of Education",
        rating: 4.6,
        researchCount: 30,
        admissionDates: "Spring 2024: Apr 5 - May 20",
        events: [
            {
                name: "Innovation Challenge Japan",
                date: new Date("2024-04-15"),
                description: "National competition on emerging technologies."
            }
        ],
        sports: [
            {
                category: "Baseball",
                facilities: "National-grade baseball stadium",
                teams: "University Titans",
                achievements: "Tokyo Cup 2023 Winners"
            }
        ],
        researchWorks: ["Nano Robotics", "Smart Materials"],
        admissionProcess:
            "Apply through the Japan National Admission Portal, submit research proposal."
    },
    {
        name: "University of Toronto Engineering",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/3/32/Sandford_Fleming_Building_2011_Toronto.jpg",
        description:
            "Canada’s top engineering school known for sustainability and innovation.",
        location: "Toronto, Canada",
        established: 1827,
        students: "23,000+",
        faculty: "1,400+",
        campusSize: "310 acres",
        accreditation: "Canadian Engineering Accreditation Board",
        rating: 4.7,
        researchCount: 26,
        admissionDates: "Winter 2024: Dec 1 - Jan 31",
        events: [
            {
                name: "Sustainability Week",
                date: new Date("2024-02-10"),
                description: "Events promoting eco-friendly technologies and research."
            }
        ],
        sports: [
            {
                category: "Ice Hockey",
                facilities: "Olympic standard ice rink",
                teams: "Varsity Blues",
                achievements: "Canadian University Cup 2023"
            }
        ],
        researchWorks: ["Clean Water Systems", "Renewable Energy Solutions"],
        admissionProcess:
            "Apply online, submit academic transcripts, and attend evaluation interview."
    },
    {
        name: "ETH Zurich Polytechnic",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0BgFhzF85GRDBXfFP0U15z5bxTEiI6a2blA&s",
        description:
            "One of Europe’s top universities for science, technology, and engineering.",
        location: "Zurich, Switzerland",
        established: 1855,
        students: "21,000+",
        faculty: "900+",
        campusSize: "220 acres",
        accreditation: "Swiss Federal Institute Accreditation",
        rating: 4.8,
        researchCount: 33,
        admissionDates: "Fall 2024: Aug 1 - Sep 15",
        events: [
            {
                name: "Research Expo Europe",
                date: new Date("2024-09-10"),
                description: "Annual research fair with projects from 40+ countries."
            }
        ],
        sports: [
            {
                category: "Athletics",
                facilities: "Track and indoor sports complex",
                teams: "ETH Track Club",
                achievements: "European University Athletics 2023"
            }
        ],
        researchWorks: ["Renewable Power Systems", "Advanced Robotics"],
        admissionProcess: "Online form submission, recommendation letters, interview."
    },
    {
        name: "University of Sydney",
        image:
            "https://images.shiksha.com/mediadata/images/1515481785phpZsgL9D_g.png",
        description:
            "Australia’s oldest university with excellence in education and research.",
        location: "Sydney, Australia",
        established: 1850,
        students: "30,000+",
        faculty: "2,000+",
        campusSize: "400 acres",
        accreditation: "Australian Education Council",
        rating: 4.6,
        researchCount: 27,
        admissionDates: "Summer 2024: Dec 10 - Feb 10",
        events: [
            {
                name: "Cultural Week Australia",
                date: new Date("2024-02-05"),
                description: "A celebration of diverse cultures through art and performances."
            }
        ],
        sports: [
            {
                category: "Rugby",
                facilities: "Sydney Sports Arena",
                teams: "University Lions",
                achievements: "National Rugby League 2023 Semifinalists"
            }
        ],
        researchWorks: ["Marine Biology Research", "Indigenous Studies"],
        admissionProcess: "Apply through online portal, submit IELTS and academic results."
    },
    {
        name: "Massachusetts Institute of Technology",
        image:
            "https://www.mit.edu/files/images/202505/MIT-This-is-MIT-SLsub_0_0.jpg",
        description:
            "MIT is a world-renowned institute focusing on engineering, science, and innovation.",
        location: "Cambridge, USA",
        established: 1861,
        students: "24,000+",
        faculty: "2,100+",
        campusSize: "168 acres",
        accreditation: "NEASC Accredited",
        rating: 5.0,
        researchCount: 45,
        admissionDates: "Spring 2024: Feb 1 - Mar 20",
        events: [
            {
                name: "AI Research Conference",
                date: new Date("2024-03-12"),
                description: "Annual international AI and robotics research conference."
            }
        ],
        sports: [
            {
                category: "Swimming",
                facilities: "Olympic-size indoor pool",
                teams: "MIT Sharks",
                achievements: "Intercollegiate Swim Meet 2023 Champions"
            }
        ],
        researchWorks: ["Machine Learning in Healthcare", "Quantum Computing"],
        admissionProcess:
            "Submit SAT/TOEFL scores, provide essays and recommendations, attend interview."
    }
];




const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        // await College.deleteMany();
        await College.create(colleges);
        console.log('Data seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();