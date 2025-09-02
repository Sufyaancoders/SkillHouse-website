import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import './index.css'  // This should be before any component imports
import Navbar from './components/common/Navbar'

// Lazy load components for better code splitting
const Home = React.lazy(() => import('./pages/home'))

// Auth components
const SignupPage = React.lazy(() => import('./pages/Signup'))
const Login = React.lazy(() => import('./pages/login'))
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'))
const VerifyEmail = React.lazy(() => import('./pages/VerifyEmail'))
const UpdatePassword = React.lazy(() => import('./pages/UpdatePassword'))

// Import route wrappers normally (they're small)
import OpenRoute from './components/core/Auth/OpenRoute'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import LoadingSpinner from './components/common/LoadingSpinner'

// Dashboard components - lazy loaded
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const MyProfile = React.lazy(() => import('./components/core/Dashboard/MyProfile'))
const Settings = React.lazy(() => import('./components/core/Dashboard/Settings'))
const Cart = React.lazy(() => import('./components/core/Dashboard/Cart'))
const EnrolledCourses = React.lazy(() => import('./components/core/Dashboard/EnrolledCourses'))

// Instructor components - lazy loaded
const Instructor = React.lazy(() => import('./components/core/Dashboard/InstructorDashboard/Instructor'))
const AddCourse = React.lazy(() => import('./components/core/Dashboard/AddCourse'))
const MyCourses = React.lazy(() => import('./components/core/Dashboard/MyCourses'))
const EditCourse = React.lazy(() => import('./components/core/Dashboard/EditCourse'))

// Student components - lazy loaded
const ViewCourse = React.lazy(() => import('./pages/ViewCourse'))
const VideoDetails = React.lazy(() => import('./components/core/ViewCourse/VideoDetails'))

// Static pages - lazy loaded
const AboutPage = React.lazy(() => import('./pages/About'))
const ContactPage = React.lazy(() => import('./pages/ContactPage'))

// Constants
import { ACCOUNT_TYPE } from './utils/constants'

function App() {
  const { user } = useSelector((state) => state.profile)
  
  return (
    <div className='w-screen min-h-screen bg-slate-900 flex flex-col font-inter'> 
      <Navbar/>
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </div>
  )
}

export default App
