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