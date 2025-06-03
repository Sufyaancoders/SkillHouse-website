import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import './index.css'  // This should be before any component imports
import Navbar from './components/common/Navbar'
// Add this import at the top
import SignupPage from './pages/Signup';
// Add this import at the top
import OpenRoute from './components/core/Auth/OpenRoute';
import Login from './pages/login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail'
import UpdatePassword from './pages/UpdatePassword';
// import AboutPage from './pages/AboutPage'
import AboutPage from './pages/About'; // Adjust the import path as necessary
function App() {
  // const [count, setCount] = useState(
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
        />  <Route
  path="update-password/:token"
  element={<UpdatePassword />}
/>
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/portfolio" element={<h1>Portfolio</h1>} />
      </Routes>
    </div>
  )
}

export default App
