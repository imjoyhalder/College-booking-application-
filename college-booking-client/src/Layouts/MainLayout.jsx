
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="fixed top-0 left-0 right-0 z-50  shadow-lg">
                <Navbar></Navbar>
            </nav>
            <main className='flex-1 mt-20'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

// const MainLayout = () => {
//     return (
//         <div className="min-h-screen flex flex-col mx-auto">
//             <nav>
//                 <Navbar></Navbar>
//             </nav>
//             <main className="flex-1">
//                 <Outlet></Outlet>
//             </main>
//             <footer>
//                 <Footer></Footer>
//             </footer>
//         </div>
//     );
// };

export default MainLayout;