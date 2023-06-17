import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../pages/Home/Home/Home";
import NotFound from "../component/NotFound/NotFound";
import SignUp from "../pages/Shared/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Dashboard from "../LayOut/Dashboard";
import HomeDasboard from "../pages/Dashboard/HomeDashboard";
import GuestRoute from "./GuestRoute";
import PrivateRoute from './PrivateRoute'
import MyClass from "../pages/Dashboard/Instructor/MyClass";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import ManageClass from "../pages/Dashboard/Admin/ManageClass";
import MySelectedClass from "../pages/Dashboard/Student/MySelectedClass";
import UserManagement from "../pages/Dashboard/Admin/UserManagement";
import StudentPayment from "../pages/Dashboard/Student/Payment/StudentPayment";
import AllCourses from "../pages/AllCourses/AllCourses";
import AllInstructor from "../pages/AllInstructor/AllInstructor";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";
import MyEnrolledClass from "../pages/Dashboard/Student/MyEnrollClass";
import PaymentHistory from "../pages/Dashboard/Student/PaymentHistory";

  export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/all_class',
                element:<AllCourses />
            },
            {
                path:'/all_instructor',
                element:<AllInstructor />
            },
            {
                path:'/signup',
                element: <GuestRoute><SignUp></SignUp></GuestRoute>
            },
            {
                path: '/login',
                element: <GuestRoute><Login></Login></GuestRoute>
            }
        ]
    },
    {
        path:'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:'',
                element:<HomeDasboard />
            },
            {
                path:'/dashboard/add_class',
                element:<InstructorRoute><AddClass /></InstructorRoute>
            },
             {
                path:'/dashboard/my_class',
                element:<InstructorRoute><MyClass /></InstructorRoute>
            },
            {
                path:'/dashboard/manage_class',
                element:<AdminRoute><ManageClass /></AdminRoute>
            },
            {
                path:'/dashboard/my_selected_class',
                element:<StudentRoute><MySelectedClass /></StudentRoute>
            },
            {
                path:'/dashboard/my_enrolled_class',
                element:<StudentRoute><MyEnrolledClass /></StudentRoute>
            },
             {
                path:'/dashboard/payment_history',
                element:<StudentRoute><PaymentHistory /></StudentRoute>
            },
            {
                path:'/dashboard/user_management',
                element:<AdminRoute><UserManagement /></AdminRoute>
            },
            {
                path:'/dashboard/student_checkout/:id',
                element:<StudentRoute><StudentPayment /></StudentRoute>
            },
        ]
    },
    {
        path:'*',
        element:<NotFound></NotFound>
    }
  ])