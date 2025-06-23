import React from 'react'
import { useSelector } from 'react-redux'
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
import PrivateRoute from './components/core/Auth/PrivateRoute'

// Dashboard components
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import Settings from './components/core/Dashboard/Settings'
import Cart from './components/core/Dashboard/Cart'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'

// Instructor components
import Instructor from './components/core/Dashboard/InstructorDashboard/Instructor'
import AddCourse from './components/core/Dashboard/AddCourse'
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse'

// Student components
import ViewCourse from './pages/ViewCourse'  // Add this import
import VideoDetails from './components/core/ViewCourse/VideoDetails'
  // Add this import

// Static pages
import AboutPage from './pages/About'
import ContactPage from './pages/ContactPage'

// Constants
import { ACCOUNT_TYPE } from './utils/constants'

function App() {
  const { user } = useSelector((state) => state.profile)
  
  return (
    <div className='w-screen min-h-screen bg-slate-900 flex flex-col font-inter'> 
      <Navbar/>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home/>} />
              
        {/* Auth Routes */}
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
          {/* Common Dashboard Routes */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} /> {/* Fixed case to lowercase */}

          {/* Student Routes */}
          <Route 
            path="dashboard/cart" 
            element={user?.accountType === ACCOUNT_TYPE.STUDENT ? <Cart /> : null} 
          />
          <Route 
            path="dashboard/enrolled-courses" 
            element={user?.accountType === ACCOUNT_TYPE.STUDENT ? <EnrolledCourses /> : null} 
          />

          {/* Instructor Routes */}
          <Route 
            path="dashboard/instructor" 
            element={user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? <Instructor /> : null} 
          />
          <Route 
            path="dashboard/add-course" 
            element={user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? <AddCourse /> : null} 
          />
          <Route 
            path="dashboard/my-courses" 
            element={user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? <MyCourses /> : null} 
          />
          <Route 
            path="dashboard/edit-course/:courseId" 
            element={user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? <EditCourse /> : null} 
          />
        </Route>
        
        {/* Course View Routes */}
        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={user?.accountType === ACCOUNT_TYPE.STUDENT ? <VideoDetails /> : null}
          />
        </Route>

        {/* Static Pages */}
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  )
}

export default App
