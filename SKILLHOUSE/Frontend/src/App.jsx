import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import './index.css'  // This should be before any component imports
import Navbar from './components/common/Navbar'
function App() {
  // const [count, setCount] = useState(
  return (
    <div className='w-screen min-h-screen bg-black flex flex-col font-inter'> 
<Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/portfolio" element={<h1>Portfolio</h1>} />
      </Routes>
    </div>
  )
}

export default App
