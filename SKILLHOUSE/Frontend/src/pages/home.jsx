import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="py-4 md:py-8 px-2 md:px-0 overflow-hidden">
            {/* Hero Section with Gradient Overlay */}
            <div className="relative flex flex-col items-center text-white mx-auto w-full md:w-11/12 p-4 md:p-8 mb-6 md:mb-10 rounded-xl overflow-hidden">
                {/* Background with gradient overlay */}
                {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-black/90 z-0"></div> */}
                
                {/* Content */}
                <div className="relative z-10 w-full">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-center">Welcome to <span className="text-blue-400">SkillHouse</span></h1>
                    <p className="text-lg md:text-xl mb-6 md:mb-8 text-center max-w-2xl mx-auto">Your journey to mastery begins here</p>
                    
                    <div className="flex justify-center">
                        <Link to="/Signup" className="flex items-center space-x-1 md:space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full transition duration-300 shadow-lg hover:shadow-blue-600/30">
                            <p className="text-base md:text-lg font-medium">Become an instructor</p>
                            <FaArrowRightLong className="ml-1 md:ml-2" />
                        </Link>
                    </div>
                    
                    <div className="mt-8 md:mt-12 text-center w-full">
                        <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">Over 500+ courses available</p>
                        
                        {/* Enhanced stats cards */}
                        <div className="flex justify-center flex-wrap gap-4">
                            <div className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition shadow-lg">
                                <span className="block text-xl md:text-4xl font-bold text-blue-400">50K+</span>
                                <span className="text-xs md:text-sm text-gray-300">Students</span>
                            </div>
                            <div className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition shadow-lg">
                                <span className="block text-xl md:text-4xl font-bold text-blue-400">100+</span>
                                <span className="text-xs md:text-sm text-gray-300">Expert Instructors</span>
                            </div>
                            <div className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition shadow-lg">
                                <span className="block text-xl md:text-4xl font-bold text-blue-400">4.8</span>
                                <span className="text-xs md:text-sm text-gray-300">Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Featured Courses with Background Pattern */}
            <div className="text-white mx-auto w-full md:w-11/12 my-6 md:my-10 px-2 md:px-0 relative">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-black opacity-30 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBjNiAwIDEwLTMgMTAtMTBTMjYgMCAyMCAwIDEwIDMgMTAgMTBzNCAxMCAxMCAxMHptMCAyYy04IDAtMTAgNi0xMCAxMHM0IDggMTAgOCAxMC00IDEwLTgtMi0xMC0xMC0xMHoiIGZpbGw9IiMxMDEwMTAiIGZpbGwtb3BhY2l0eT0iLjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] bg-[length:20px_20px] rounded-xl"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <h2 className="text-xl md:text-2xl font-bold">Featured Courses</h2>
                        <Link to="/courses" className="text-blue-400 hover:text-blue-300 text-sm md:text-base flex items-center group">
                            View all <FaArrowRightLong className="ml-1 text-xs group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    
                    {/* Course cards with glass effect */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-xl hover:shadow-blue-900/20 transition-all hover:-translate-y-1 group">
                            <div className="h-32 md:h-40 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg mb-3 md:mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>
                            </div>
                            <h3 className="font-bold text-sm md:text-base group-hover:text-blue-400 transition">Web Development Bootcamp</h3>
                            <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">Learn modern web development</p>
                            <div className="mt-2 md:mt-3 flex justify-between items-center">
                                <span className="text-blue-400 font-bold">$49.99</span>
                                <span className="text-xs bg-blue-900/50 border border-blue-800 px-2 py-1 rounded-full">Bestseller</span>
                            </div>
                        </div>
                        
                        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-xl hover:shadow-blue-900/20 transition-all hover:-translate-y-1 group">
                            <div className="h-32 md:h-40 bg-gradient-to-br from-purple-800 to-pink-800 rounded-lg mb-3 md:mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>
                            </div>
                            <h3 className="font-bold text-sm md:text-base group-hover:text-blue-400 transition">Data Science Fundamentals</h3>
                            <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">Master data analysis techniques</p>
                            <div className="mt-2 md:mt-3 flex justify-between items-center">
                                <span className="text-blue-400 font-bold">$59.99</span>
                                <span className="text-xs bg-purple-900/50 border border-purple-800 px-2 py-1 rounded-full">Popular</span>
                            </div>
                        </div>
                        
                        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-xl hover:shadow-blue-900/20 transition-all hover:-translate-y-1 group">
                            <div className="h-32 md:h-40 bg-gradient-to-br from-indigo-800 to-blue-800 rounded-lg mb-3 md:mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition"></div>
                            </div>
                            <h3 className="font-bold text-sm md:text-base group-hover:text-blue-400 transition">UI/UX Design</h3>
                            <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">Create beautiful user experiences</p>
                            <div className="mt-2 md:mt-3 flex justify-between items-center">
                                <span className="text-blue-400 font-bold">$39.99</span>
                                <span className="text-xs bg-indigo-900/50 border border-indigo-800 px-2 py-1 rounded-full">New</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Categories Section with Wave Background */}
            <div className="text-white mx-auto w-full md:w-11/12 my-8 md:my-12 px-2 md:px-0 relative py-8 md:py-12 rounded-xl overflow-hidden">
                {/* Wave background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjMDA0NGZmIiBkPSJNMCAwaDI4ODB2NzYwSDB6Ii8+PHBhdGggZD0iTTAgMGwxNDQwIDUwUzIxNjAgMjAgMTQ0MCAyMDBzLTE0NDAuNDI0IDEwOS41NzYgMCA0MDBTMTQ0MCA2OTAgMTQ0MCA2OTBMMCAyMDB2LTYwMHoiIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
                
                <div className="relative z-10">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Browse Top Categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                        {['Development', 'Business', 'Design', 'Marketing', 'IT & Software', 'Personal Development'].map((category, index) => (
                            <div key={index} className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-3 md:p-4 text-center hover:bg-black/50 hover:border-blue-500/30 cursor-pointer transition-all hover:-translate-y-1">
                                <div className="mb-2 flex justify-center">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center shadow-lg shadow-blue-900/30">
                                        <span className="text-sm md:text-base">{category.charAt(0)}</span>
                                    </div>
                                </div>
                                <p className="text-xs md:text-sm font-medium">{category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Enhanced CTA Section */}
            <div className="text-white mx-auto w-full md:w-11/12 my-6 md:my-10 rounded-xl p-4 md:p-8 text-center relative overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 animate-pulse"></div>
                
                {/* Geometric overlay pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMzYgMzRoLTJWMTZoLTE2di0yaDEwdjEwSDEwVjE0aDI0djIwek0xMCAzNnYtMmgyNHYySDEweiIgZmlsbD0iI2ZmZiI+PC9wYXRoPjwvZz48L3N2Zz4=')",
                }}></div>
                
                <div className="relative z-10">
                    <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">Ready to Start Learning?</h2>
                    <p className="text-sm md:text-base mb-4 md:mb-6 max-w-lg mx-auto">Join thousands of students already learning on SkillHouse. Get unlimited access to all courses.</p>
                    <Link to="/signup" className="inline-block bg-white text-blue-900 px-6 py-2 md:py-3 rounded-full font-medium hover:bg-blue-50 transition shadow-lg hover:shadow-white/30">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;