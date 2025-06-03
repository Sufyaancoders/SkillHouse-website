import React from 'react';
import { Code, Palette, VideoIcon, BarChart, BookOpen, Lightbulb } from 'lucide-react';

const LearningCard = ({ icon, title, description, color }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 ${color}`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const LearningSection = () => {
  const categories = [
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Programming & Development",
      description: "Master coding with hands-on projects and expert-led courses in web, mobile, and software development.",
      color: "border-blue-500"
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-600" />,
      title: "Design & Creativity",
      description: "Unleash your creative potential with courses in UI/UX, graphic design, illustration, and digital art.",
      color: "border-purple-500"
    },
    {
      icon: <VideoIcon className="w-8 h-8 text-red-600" />,
      title: "Digital Media & Content",
      description: "Create engaging content with courses in video production, photography, and social media marketing.",
      color: "border-red-500"
    },
    {
      icon: <BarChart className="w-8 h-8 text-green-600" />,
      title: "Business & Marketing",
      description: "Develop business acumen with courses in digital marketing, entrepreneurship, and business strategy.",
      color: "border-green-500"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-yellow-600" />,
      title: "Language & Communication",
      description: "Enhance your communication skills with courses in language learning, writing, and public speaking.",
      color: "border-yellow-500"
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-pink-600" />,
      title: "Personal Development",
      description: "Grow personally and professionally with courses in productivity, leadership, and mindfulness.",
      color: "border-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Learning Categories</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover courses taught by industry experts designed to help you acquire practical skills for today's digital world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <LearningCard
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              color={category.color}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Explore All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningSection;
