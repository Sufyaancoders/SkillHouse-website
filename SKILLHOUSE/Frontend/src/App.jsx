import React from 'react'
import { useSelector } from 'react-redux' // Add this import
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import './index.css'  // This should be before any component imports
import Navbar from './components/common/Navbar'

// Auth components
import SignupPage from './pages/Signup'
import Login from './pages/login'
import ForgotPassword from './pages/ForgotPassword'
import VerifyEmail from './pages/VerifyEmail'
import UpdatePassword from './pages/UpdatePassword'
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute' // Add this import

// Dashboard components
import Dashboard from './pages/Dashboard' // Add this import
import MyProfile from './components/core/Dashboard/MyProfile' // Add this import
import Settings from './components/core/Dashboard/Settings' // Add this import
import Cart from './components/core/Dashboard/Cart' // Add this import
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses' // Add this import

// Instructor components
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor' // Add this import
import AddCourse from './components/core/Dashboard/AddCourse' // Add this import
import MyCourses from './components/core/Dashboard/MyCourses' // Add this import
import EditCourse from './components/core/Dashboard/EditCourse' // Add this import

// Static pages
import AboutPage from './pages/About'
import ContactPage from './pages/ContactPage'

// Constants
import { ACCOUNT_TYPE } from './utils/constants' // Add this import

function App() {
    
  const { user } = useSelector((state) => state.profile)
  
  return (
    <div className='w-screen min-h-screen bg-black flex flex-col font-inter'> 
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
              
        <Route
          path="signup"
          element={
            <OpenRoute>
              <SignupPage />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path="update-password/:token" element={<UpdatePassword />} />
        
        {/* Dashboard Routes */}
        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }
        </Route>

        {/* Static Pages */}
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<ContactPage />} /> {/* Note: You have this route defined twice */}
      </Routes>
    </div>
  )
}

export default App
