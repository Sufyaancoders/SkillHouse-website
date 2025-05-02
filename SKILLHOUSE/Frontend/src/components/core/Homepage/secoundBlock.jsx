import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRightLong } from 'react-icons/fa6';

const CompanySection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  // Simple monochrome logo components
  const logos = [
    // Google "G" logo
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M12 11v2h5.51c-.26 3.06-2.81 4.43-5.51 4.43-3.31 0-6-2.69-6-6s2.69-6 6-6c1.32 0 2.54.45 3.5 1.21l1.43-1.38C15.35 4.31 13.79 3.5 12 3.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5c3.73 0 7.15-2.73 7.15-7.5 0-.51-.08-1.21-.21-1.5H12z" 
        fill="currentColor" />
    </svg>,
    
    // Microsoft logo
    <svg viewBox="0 0 23 23" className="w-full h-full">
      <path d="M1 1h9.5v9.5H1z M12.5 1H22v9.5h-9.5z M1 12.5h9.5V22H1z M12.5 12.5H22V22h-9.5z" 
        fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
    </svg>,
    
    // Amazon logo
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M15.93 17.09c-1.46.79-3.31 1.22-5.04 1.22-2.62 0-5.33-.89-7.25-2.37-.15-.11-.35.04-.22.2 1.8 2.37 5.29 3.81 8.68 3.81 2.42 0 5.12-.86 7.09-2.42.28-.23.06-.58-.26-.44zm1.07-1.1c-.98.37-1.1.54-1.6.54-.48 0-.89-.29-.95-.82-.35-2.72 6.32-2.79 5.87-7.04-.26-2.68-2.58-4.04-5.65-4.04-3.23 0-6.14 1.21-6.14 5.4 0 .68.36 2.33.36 2.33 0 .31.27.32.48.07.85-.98.54-4.51 5.92-4.51 1.92 0 2.98.69 2.98 1.71 0 2.38-6.55 2.2-6.55 6.72 0 2.82 2.47 3.5 3.84 3.5 1.38 0 2.67-.76 3.08-1.29.04-.03.19-.2.47-.68-.29-.4-.77-.38-1.11-.27z" 
        fill="currentColor" />
    </svg>,
    
    // Facebook/Meta logo
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M12.53.02C13.84 0 15.14.01 16.44.02c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" 
        fill="currentColor" />
    </svg>,
    
    // Apple logo
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M14.95 5.46c1.29-1.54 1.2-3.41 1.12-3.95-.97.11-2.23.63-2.95 1.68-.74.83-1.17 1.91-1.03 3.1 1.1.08 1.99-.28 2.86-.83zm2.88 2.09c-1.53-.09-2.86.86-3.59.86-.74 0-1.8-.79-3.05-.79-1.54.03-3.01.95-3.79 2.39-1.63 2.79-.38 6.9 1.17 9.13.78 1.19 1.69 2.38 2.92 2.34 1.19-.03 1.63-.75 3.05-.75 1.41 0 1.84.74 3.05.72 1.26-.02 2.1-1.14 2.89-2.31.89-1.3 1.26-2.56 1.29-2.64-.03-.02-2.43-.97-2.46-3.69-.02-2.24 1.84-3.29 1.93-3.39-1.04-1.6-2.67-1.77-3.41-1.87z" 
        fill="currentColor" />
    </svg>,
    
    // IBM logo
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M1.566 16.034h20.867v1.83H1.566v-1.83zm0-3.831h20.867v1.83H1.566v-1.83zm0-3.83h20.867v1.83H1.566v-1.83zm0-3.83h20.867v1.828H1.566V4.543zM5.66 20.659h1.806v-1.01H5.66zm0-2.735h1.806v-1.01H5.66zm0-2.734h1.806v-1.01H5.66zm0-2.736h1.806v-1.01H5.66zm0-2.735h1.806v-1.01H5.66zm0-2.736h1.806v-1.01H5.66zm15.28 13.676h1.492v-1.01h-1.493zm0-2.735h1.492v-1.01h-1.493zm0-2.734h1.492v-1.01h-1.493zm0-2.736h1.492v-1.01h-1.493zm0-2.735h1.492v-1.01h-1.493zm0-2.736h1.492v-1.01h-1.493zM7.452 20.66h8.696v-3.83H7.452v3.83zm0-6.566h8.696v-3.83H7.452v3.83zm0-6.566h8.696v-3.83H7.452v3.83z" 
        fill="currentColor" />
    </svg>,
    
    // Netflix logo
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M5.398 0v24l6.87-1.67V8.8l6.022 14.507L24.583 22V0h-4.583v13.11L14.329 0H9.981L9.98 18.177v-8.196l-4.582.018V0z" 
        fill="currentColor" />
    </svg>,
    
    // Adobe logo
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425h-3.71zM8.884 1.376H0v21.248zm15.116 0h-8.884v7.694z" 
        fill="currentColor" />
    </svg>
  ];

  return (
    <div className="py-16 md:py-20 px-4 md:px-0 bg-gradient-to-b from-gray-900 via-blue-900/10 to-black relative">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBMMCAwaDE4TDMwIDEyIDQyIDBINjBMMzAgMzB6IiBmaWxsPSIjMjE5NmYzIiBmaWxsLW9wYWNpdHk9Ii4wNSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16">
          {/* Left Column - Company Logos */}
          <motion.div 
            className="w-full lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"></div>
              
              {/* Grid of Company Logos */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {logos.map((logo, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center p-4 md:p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all"
                    variants={logoVariants}
                    whileHover="hover"
                  >
                    <div className="h-8 md:h-10 w-full flex items-center justify-center text-white/70 hover:text-white transition-colors">
                      {logo}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Floating Elements for Visual Interest */}
              <div className="absolute -z-10 top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute -z-10 bottom-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full"></div>
              <div className="absolute -z-10 top-3/4 right-1/2 w-2 h-2 bg-pink-400 rounded-full"></div>
            </div>
          </motion.div>
          
          {/* Right Column - Content */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={textVariants}>
              <div className="inline-block mb-3 bg-blue-600/20 px-3 py-1 rounded-full">
                <span className="text-xs md:text-sm text-blue-400 font-medium">Industry Recognition</span>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
              variants={textVariants}
            >
              Trusted by <span className="text-blue-400">Leading Companies</span> Worldwide
            </motion.h2>
            
            <motion.div 
              className="text-gray-300 mb-8 text-sm md:text-base"
              variants={textVariants}
            >
              <p className="leading-relaxed">
                Our graduates work at some of the world's most innovative companies. 
                The skills you'll learn are recognized and valued by top employers,
                giving you a competitive edge in today's job market.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={textVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/signup" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center shadow-lg shadow-blue-900/30">
                  <span>Explore Full Catalog</span>
                  <FaArrowRightLong className="ml-2" />
                </Link>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/login" className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60 rounded-lg font-medium transition-all flex items-center">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="mt-10 grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-4 rounded-lg"
                variants={logoVariants}
              >
                <div className="text-blue-400 text-2xl font-bold">94%</div>
                <div className="text-gray-400 text-sm">Employment Rate</div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-4 rounded-lg"
                variants={logoVariants}
              >
                <div className="text-blue-400 text-2xl font-bold">250+</div>
                <div className="text-gray-400 text-sm">Hiring Partners</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompanySection;