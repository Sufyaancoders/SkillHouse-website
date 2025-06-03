import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Target } from 'lucide-react';

const StoryMissionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Story Column */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Founding Story</h2>
            
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Skill House began in 2020 when a group of passionate educators identified a gap in online learning. Despite the abundance of content, there was a lack of genuine connection between teachers and students.
              </p>
              <p className="mb-4">
                Our founders, coming from diverse backgrounds in education and technology, united with a shared vision: to create a platform where knowledge exchange feels personal and transformative.
              </p>
              <p>
                What started in a small co-working space has grown into a global community of over 10,000 instructors and 1 million learners. Yet our core principle remains unchanged—education should be accessible, engaging, and empowering.
              </p>
            </div>
            
            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Skill House founding team" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Vision & Mission Column */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
              
              {/* Vision Section */}
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Lightbulb className="text-blue-600 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-700">
                  We envision a world where quality education transcends geographical, financial, and social barriers—where anyone with passion can learn any skill, and anyone with knowledge can become a teacher.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <p className="text-sm font-medium text-gray-600">Accessible</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <p className="text-sm font-medium text-gray-600">Engaging</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <p className="text-sm font-medium text-gray-600">Transformative</p>
                  </div>
                </div>
              </div>

              {/* Mission Section */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Target className="text-purple-600 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-700">
                  To build the most human-centered learning platform that empowers both educators and students. We're committed to creating technology that fosters genuine connections, promotes active learning, and enables sustainable careers in education.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <p className="text-gray-700">Connecting passionate teachers with eager students</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <p className="text-gray-700">Building tools that enhance the teaching experience</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <p className="text-gray-700">Creating equitable opportunities for knowledge sharing</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryMissionSection;
