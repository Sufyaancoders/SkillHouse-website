import React from 'react';
import { Quote } from 'lucide-react';

const QuoteSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative">
          <Quote className="absolute text-indigo-200 w-24 h-24 -top-10 -left-10 opacity-70" />
          
          <blockquote className="relative z-10 text-center p-8 md:p-12">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light italic text-gray-800 leading-relaxed">
              "Education is not the filling of a pail, but the lighting of a fire. At Skill House, we don't just transfer knowledge—we <span className="font-semibold text-blue-600">ignite passion</span> and <span className="font-semibold text-purple-600">empower action</span>."
            </p>
            
            <footer className="mt-8">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Founder" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 text-left">
                  <p className="font-semibold text-gray-900">Thomas Mitchell</p>
                  <p className="text-sm text-gray-600">Founder & CEO, Skill House</p>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;

