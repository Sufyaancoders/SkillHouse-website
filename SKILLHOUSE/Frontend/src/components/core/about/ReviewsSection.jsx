import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Web Development Student",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5,
      text: "The JavaScript course I took on Skill House completely transformed my career. The instructor was engaging and the content was perfectly paced. I went from knowing nothing about coding to landing a junior developer position in just 6 months!"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "UX Design Professional",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5,
      text: "As someone already working in design, I was looking to update my UX skills. The advanced courses at Skill House were exactly what I needed. The projects were challenging and relevant to real-world applications. Highly recommend!"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Digital Marketing Specialist",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4,
      text: "The SEO and content marketing courses provided practical strategies I could implement immediately. What sets Skill House apart is the community aspect – the forum discussions with other marketers were invaluable for networking and sharing ideas."
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Photography Enthusiast",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5,
      text: "I took a photography course as a hobby, but the quality was so professional that I've started freelancing on the side. The instructor's feedback on assignments was detailed and helped me improve quickly. The platform is intuitive and makes learning enjoyable."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    setTranslateX(-activeIndex * 100);
  }, [activeIndex]);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Learners Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how Skill House is helping people transform their careers and pursue their passions.
          </p>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center mb-6">
                      <div className="mb-4 md:mb-0 md:mr-6">
                        <img 
                          src={review.avatar} 
                          alt={review.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{review.name}</h3>
                        <p className="text-gray-600">{review.role}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="italic text-gray-700 text-lg leading-relaxed">
                      "{review.text}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <div className="flex justify-center mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
