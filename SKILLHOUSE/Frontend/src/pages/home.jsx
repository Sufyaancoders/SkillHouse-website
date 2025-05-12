import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CodeBlocks from "../components/core/Homepage/codeblock";
import CompanySection from '../components/core/Homepage/secoundBlock';
import ExploreMore from "../components/core/Homepage/ExploreMore";
import Button from "../components/core/Homepage/button";
import { FaArrowRight } from "react-icons/fa";
import TimelineSection from "../components/core/Homepage/TimelineSection";
import LearningLanguageSection from "../components/core/Homepage/LearningLanguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
// import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";
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
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-2 text-center">Welcome to <span className="text-blue-400">SkillHouse</span></h1>
                    <p className="text-lg md:text-x mb-6 md:mb-8 text-center max-w-2xl mx-auto">Your journey to mastery begins here</p>
                    
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
                                <span className="block text-x md:text-3xl font-bold text-blue-400">50K+</span>
                                <span className="text-xs md:text-sm text-gray-300">Students</span>
                            </div>
                            <div className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition shadow-lg">
                                <span className="block text-x md:text-3xl font-bold text-blue-400">100+</span>
                                <span className="text-xs md:text-sm text-gray-300">Expert Instructors</span>
                            </div>
                            <div className="text-center px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition shadow-xs">
                                <span className="block text-x md:text-3xl font-bold text-blue-400">4.8</span>
                                <span className="text-xs md:text-sm text-gray-300">Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* some text and subheadings .and two buttons learn more and book demo   */}
          {/* Empowerment Section with Gradient Background */}
<div className="relative mx-auto w-full md:w-11/12 my-8 md:my-12 p-6 md:p-10 rounded-xl overflow-hidden">
    {/* Gradient background */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900/30 to-gray-900 z-0"></div>
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBMMCAwaDE4TDMwIDEyIDQyIDBINjBMMzAgMzB6IiBmaWxsPSIjMjE5NmYzIiBmaWxsLW9wYWNpdHk9Ii4yIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] bg-[length:30px_30px] opacity-5 z-0"></div>
    
    <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-block mb-3 bg-blue-600/20 px-3 py-1 rounded-full">
            <span className="text-xs md:text-sm text-blue-400 font-medium">Why Choose SkillHouse?</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Empower Your Future with <span className="text-blue-400">Coding Skills</span>
        </h2>
        
        <div className="text-gray-300 mb-8 text-sm md:text-base">
            <p className="leading-relaxed">
                With the right skills, you can unlock a world of opportunities.
                Whether you're looking to start a new career, advance in your current job, 
                or simply learn something new, coding is a valuable skill that can help you achieve your goals.
            </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
            <a href="/learn-more" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:-translate-y-0.5">
                <span>Learn More</span>
                <FaArrowRightLong className="ml-2" />
            </a>
            <a href="/book-demo" className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60 rounded-lg font-medium transition-all flex items-center">
                Book a Free Demo
            </a>
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
                    
                    {/* Course cards with glass effect - IMPROVED */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Web Development Card */}
                        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 group">
                            {/* Card Image */}
                            <div className="h-48 bg-gradient-to-br from-blue-900 to-purple-900 relative">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                                    alt="Web Development"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className="text-xs font-medium bg-blue-600/80 border border-blue-500/50 px-2.5 py-1 rounded-full text-white backdrop-blur-sm">Bestseller</span>
                                </div>
                            </div>
                            
                            {/* Card Content */}
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
                                    Web Development Bootcamp
                                </h3>
                                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                                    Learn modern web development with HTML, CSS, JavaScript, React and Node.js
                                </p>
                                
                                {/* Instructor and Rating */}
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                                            <span className="text-xs text-white font-medium">JS</span>
                                        </div>
                                        <p className="text-xs text-gray-400">John Smith</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-xs text-gray-400">4.8</span>
                                    </div>
                                </div>
                                
                                {/* Price and Button */}
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-blue-400 font-bold">$49.99</span>
                                    <button className="px-3 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors">
                                        View Course
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Data Science Card */}
                        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300 hover:-translate-y-1 group">
                            <div className="h-48 bg-gradient-to-br from-purple-800 to-pink-800 relative">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" 
                                    alt="Data Science"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className="text-xs font-medium bg-purple-600/80 border border-purple-500/50 px-2.5 py-1 rounded-full text-white backdrop-blur-sm">Popular</span>
                                </div>
                            </div>
                            
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors duration-300">
                                    Data Science Fundamentals
                                </h3>
                                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                                    Master data analysis techniques with Python, pandas and machine learning
                                </p>
                                
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                                            <span className="text-xs text-white font-medium">AJ</span>
                                        </div>
                                        <p className="text-xs text-gray-400">Anna Johnson</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-xs text-gray-400">4.7</span>
                                    </div>
                                </div>
                                
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-purple-400 font-bold">$59.99</span>
                                    <button className="px-3 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-medium rounded-lg transition-colors">
                                        View Course
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* UI/UX Card */}
                        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-indigo-900/20 transition-all duration-300 hover:-translate-y-1 group">
                            <div className="h-48 bg-gradient-to-br from-indigo-800 to-blue-800 relative">
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1561070791-2526d30994b5" 
                                    alt="UI/UX Design"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-300"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className="text-xs font-medium bg-indigo-600/80 border border-indigo-500/50 px-2.5 py-1 rounded-full text-white backdrop-blur-sm">New</span>
                                </div>
                            </div>
                            
                            <div className="p-5">
                                <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors duration-300">
                                    UI/UX Design
                                </h3>
                                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                                    Create beautiful user experiences with Figma and modern design principles
                                </p>
                                
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                                            <span className="text-xs text-white font-medium">ML</span>
                                        </div>
                                        <p className="text-xs text-gray-400">Maria Lee</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-xs text-gray-400">4.9</span>
                                    </div>
                                </div>
                                
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-indigo-400 font-bold">$39.99</span>
                                    <button className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors">
                                        View Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Categories Section with Wave Background */}


            
            {/* {section 4 } */}

<div>
         
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold text-white">
                Unlock your
                <span className="text-blue-400"> coding potential</span> with our online
                courses.
              </div>
            }
            subheading={
              <p className="text-gray-300 text-base">
                Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
              </p>
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-300"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg -z-10"></div>}
          />
       
             </div>
{/* section 5 */}

<div>
  {/* Section 5 - Company Logos and Content */}
  <CompanySection />
</div>

            

             {/* center heading and subheading */}

            <ExploreMore />
            {/* // section -6 */}
            
            <div className="bg-white text-black">
        <div className="homepage_bg h-[220px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[60px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-2">
              <Button active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </Button>
              <Button active={false} linkto={"/login"}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-80px] flex flex-col justify-between gap-7 lg:mt-10 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <span className="text-blue-400"> job that is in demand</span>
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <Button active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </Button>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
        </div>
{/* section-7 */}
<div>
    <InstructorSection />
    <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}

</div>
 {/* footer place */}
 <div>
 <Footer />
 </div>

        </div>
       
        


    );
}

export default Home;