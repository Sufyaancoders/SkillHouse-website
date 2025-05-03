import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
// import CourseCard from "./CourseCard";
import { motion } from 'framer-motion';

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="py-16 md:py-18 px-6 md:px-0 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBMMCAwaDE4TDMwIDEyIDQyIDBINjBMMzAgMzB6IiBmaWxsPSIjMjE5NmYzIiBmaWxsLW9wYWNpdHk9Ii4wNSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-10"></div>
      </div>

      {/* Section Content - Set to relative for proper stacking */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-3 bg-blue-600/20 px-3 py-1 rounded-full">
            <span className="text-xs md:text-sm text-blue-400 font-medium">Browse Categories</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Unlock the <span className="text-blue-400">Power of Code</span>
          </h2>
          
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Learn to Build Anything You Can Imagine
          </p>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-1 bg-gray-800/60 backdrop-blur-sm p-1.5 rounded-full border border-gray-700/50">
            {tabsName.map((tab, index) => (
              <button
                key={index}
                className={`px-4 md:px-6 py-2 text-sm md:text-base rounded-full transition-all duration-300 ${
                  currentTab === tab
                    ? "bg-blue-600 text-white font-medium shadow-lg shadow-blue-900/30"
                    : "text-gray-300 hover:bg-gray-700/70"
                }`}
                onClick={() => setMyCards(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Container - No absolute positioning */}
        {/* <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"> */}
        <div className={`grid gap-8 md:gap-10 mx-auto ${
            courses.length === 1 
              ? "grid-cols-1 max-w-md" 
              : courses.length === 2 
                ? "grid-cols-1 md:grid-cols-2 max-w-2xl" 
                : courses.length === 3 
                  ? "grid-cols-1 md:grid-cols-3 max-w-4xl" 
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          }`}>
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border overflow-hidden transition-all duration-300 h-full ${
                  currentCard === course.heading
                    ? "border-blue-500/50 shadow-lg shadow-blue-900/20"
                    : "border-gray-700/50 hover:border-gray-600/50"
                }`}
                onClick={() => setCurrentCard(course.heading)}
              >
                {/* Course Card Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${
                    currentCard === course.heading ? "text-blue-400" : "text-white"
                  }`}>
                    {course.heading}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-400">
                      <span>{course.level}</span>
                      <span className="mx-2">•</span>
                      <span>{course.lessionNumber} lessons</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Highlight Bar */}
                <div className={`h-1 w-full ${
                  currentCard === course.heading ? "bg-blue-500" : "bg-transparent"
                }`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;