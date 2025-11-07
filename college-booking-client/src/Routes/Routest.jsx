// router.js
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Colleges from "../Pages/Colleges/Colleges";
import CollegeDetails from "../Pages/CollegeDetails/CollegeDetails";
import Admission from "../Pages/Admission/Admission";
import MyCollege from "../Pages/MyCollege/MyCollege";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import NotFound from "../Pages/NotFound/NotFound";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/colleges",
                element: <Colleges></Colleges>
            },
            {
                path: "/colleges/:id",
                element: <PrivateRoute><CollegeDetails></CollegeDetails></PrivateRoute>
            },
            {
                path: "/admission",
                element: <PrivateRoute><Admission></Admission></PrivateRoute>
            },
            {
                path: "/my-college",
                element: <PrivateRoute><MyCollege></MyCollege></PrivateRoute>
            },
            {
                path: "/profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "*",
                element: <NotFound></NotFound>
            }
        ]
    },
]);

export default router;