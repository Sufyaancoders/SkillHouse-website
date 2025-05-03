import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

// Button component needed for the section
const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <button 
        className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center ${
          active 
          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/30" 
          : "bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60"
        }`}
      >
        {children}
      </button>
    </Link>
  );
};

const InstructorSection = () => {
  // Sample instructor images
  const instructors = [
    {
      name: "Sarah Johnson",
      role: "Web Development",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "David Chen",
      role: "Data Science",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Priya Patel",
      role: "UI/UX Design",
      image: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    {
      name: "Marcus Wilson",
      role: "Mobile Development",
      image: "https://randomuser.me/api/portraits/men/86.jpg"
    }
  ];

  return (
    <div className="relative py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBMMCAwaDE4TDMwIDEyIDQyIDBINjBMMzAgMzB6IiBmaWxsPSIjMjE5NmYzIiBmaWxsLW9wYWNpdHk9Ii4wNSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-block mb-3 bg-blue-600/20 px-3 py-1 rounded-full">
              <span className="text-xs md:text-sm text-blue-400 font-medium">Join Our Team</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Become an <span className="text-blue-400">Instructor</span> and Change Lives
            </h2>
            
            <div className="text-gray-300 mb-8 text-sm md:text-base">
              <p className="leading-relaxed">
                Share your knowledge and expertise with students worldwide. Our platform provides you with the tools and support needed to create engaging courses and reach thousands of eager learners.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center mr-2">
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Create and upload course content with ease</span>
                </li>
                <li className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center mr-2">
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Earn competitive revenue on every enrollment</span>
                </li>
                <li className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center mr-2">
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Access detailed analytics and student feedback</span>
                </li>
              </ul>
            </div>
            
            <Button active={true} linkto={"/signup"}>
              <div className="flex items-center gap-2">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </Button>
          </div>
          
          {/* Instructor Images Collection */}
          <div className="w-full lg:w-1/2">
            <div className="relative p-3 bg-gradient-to-tr from-blue-900/20 to-purple-900/20 rounded-2xl border border-gray-700/50 shadow-xl shadow-blue-900/20">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
              
              {/* Main featured instructor */}
              <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-white/80 text-center font-medium">Meet Our Top Instructors</h3>
                <div className="bg-gradient-to-tr from-blue-800/30 to-purple-800/30 p-1 rounded-full border border-gray-700/30">
                  <div className="aspect-square w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden mx-auto p-4">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Featured instructor" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-white font-semibold text-lg">Dr. Emily Richards</h4>
                  <p className="text-blue-400 text-sm">Lead Instructor • Programming Fundamentals</p>
                </div>
              </div>
              
              {/* Instructor collection */}
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {instructors.map((instructor, index) => (
                  <div key={index} className="group">
                    <div className="relative w-15 h-15 md:w-auto md:h-auto aspect-square rounded-full overflow-hidden border-2 border-gray-700/50 group-hover:border-blue-500/50 transition-colors mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end justify-center pb-2">
                        <p className="text-white text-xs font-medium hidden md:block">{instructor.role}</p>
                      </div>
                      <img 
                        src={instructor.image} 
                        alt={instructor.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-center text-white text-[10px] md:text-xs mt-1 md:mt-2 truncate">{instructor.name}</p>
                  </div>
                ))}
              </div>
              
              {/* Stats */}
              <div className="mt-6 flex justify-center gap-8 border-t border-gray-700/30 pt-4">
                <div className="text-center">
                  <p className="text-blue-400 font-bold text-xl">100+</p>
                  <p className="text-gray-400 text-xs">Expert Instructors</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-400 font-bold text-xl">15+</p>
                  <p className="text-gray-400 text-xs">Subject Areas</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-400 font-bold text-xl">4.8</p>
                  <p className="text-gray-400 text-xs">Instructor Rating</p>
                </div>
              </div>
            </div>
            
            {/* Decorative dot pattern */}
            <div className="absolute -z-10 top-1/2 -right-12 transform -translate-y-1/2">
              <div className="h-40 w-24 flex flex-wrap gap-2">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-blue-400/30"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;