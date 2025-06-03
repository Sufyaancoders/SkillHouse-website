import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-20 bg-cover bg-center"></div>
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <GraduationCap size={56} className="text-blue-300" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Empowering Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">Brighter Future</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Skill House is dedicated to democratizing education by connecting passionate teachers with eager learners, creating a community where knowledge is accessible to everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-50 transition-colors">Explore Courses</button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
