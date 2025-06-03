import React, { useState, useEffect, useRef } from 'react';
import { Users, BookOpen, Globe, Award } from 'lucide-react';

const StatItem = ({ icon, value, label, suffix = "", delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let timer;
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [value, isVisible, delay]);

  return (
    <div
      ref={ref}
      className={`text-center p-6 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } hover:scale-105`}
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
      <h3 className="text-4xl font-bold text-gray-900 mb-2">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Since our founding, we've been committed to creating a global community of learners and educators.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem 
            icon={<Users size={32} />} 
            value={1500000} 
            label="Active Learners" 
            suffix="+" 
            delay={0} 
          />
          <StatItem 
            icon={<BookOpen size={32} />} 
            value={10000} 
            label="Courses Available" 
            suffix="+" 
            delay={200} 
          />
          <StatItem 
            icon={<Globe size={32} />} 
            value={120} 
            label="Countries Reached" 
            delay={400} 
          />
          <StatItem 
            icon={<Award size={32} />} 
            value={98} 
            label="Satisfaction Rate" 
            suffix="%" 
            delay={600} 
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
