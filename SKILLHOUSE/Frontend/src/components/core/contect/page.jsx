import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Globe, MessageCircle, Send, Star } from 'lucide-react';
import contactusEndpoint from '../../../services/apiconnector';
 // Adjust the import path as necessary
// Mock data and services (replace with your actual implementations)
const mockCountries = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' }
];

const mockReviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    course: 'Full Stack Development',
    rating: 5,
    review: 'This course completely transformed my understanding of web development. The instructors are amazing and the content is top-notch.',
    avatar: null
  },
  {
    id: 2,
    name: 'Michael Chen',
    course: 'Data Science Bootcamp',
    rating: 5,
    review: 'Excellent program with hands-on projects. I landed my dream job as a data scientist within 3 months of completion.',
    avatar: null
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    course: 'UI/UX Design',
    rating: 4,
    review: 'Great course structure and practical assignments. The portfolio projects helped me showcase my skills to potential employers.',
    avatar: null
  },
  {
    id: 4,
    name: 'David Wilson',
    course: 'Machine Learning',
    rating: 5,
    review: 'The depth of content and real-world applications made this course invaluable for my career transition into AI.',
    avatar: null
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    course: 'Python Programming',
    rating: 4,
    review: 'Well-structured curriculum with excellent support from instructors. Perfect for beginners wanting to learn programming.',
    avatar: null
  }
];

// Mock API connector
const apiConnector = {
  post: async (url, data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Submitting contact form:', data);
    return { success: true, message: 'Contact form submitted successfully!' };
  },
  get: async (url) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: mockReviews };
  }
};

// Rating Stars Component
const RatingStars = ({ rating, size = 16 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

// Avatar Component
const UserAvatar = ({ name, avatar }) => {
  if (avatar) {
    return <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />;
  }
  
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
      {initials}
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }) => {
  const truncateText = (text, wordLimit = 15) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <UserAvatar name={review.name} avatar={review.avatar} />
        <div>
          <h4 className="font-semibold text-gray-800">{review.name}</h4>
          <p className="text-sm text-gray-600">{review.course}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <RatingStars rating={review.rating} />
      </div>
      
      <p className="text-gray-700 text-sm leading-relaxed">
        {truncateText(review.review)}
      </p>
    </div>
  );
};

// Review Slider Component
const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiConnector.get('/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews(mockReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / 4));
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  const getVisibleReviews = () => {
    const startIndex = currentSlide * 4;
    return reviews.slice(startIndex, startIndex + 4);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Students Say</h2>
        <p className="text-gray-600">Real feedback from our learning community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getVisibleReviews().map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(reviews.length / 4) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.countryCode) {
      newErrors.countryCode = 'Country code is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10,12}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10-12 digits';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await apiConnecto( 'Post',contactusEndpoint.CONTACT_US_API, formData);
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Get In Touch</h2>
        <p className="text-gray-600">Have questions? We'd love to hear from you!</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline mr-2" size={16} />
              First Name *
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline mr-2" size={16} />
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline mr-2" size={16} />
            Email Address *
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="inline mr-2" size={16} />
              Country Code
            </label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Select</option>
              {mockCountries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            {errors.countryCode && (
              <p className="text-red-500 text-sm mt-1">{errors.countryCode}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline mr-2" size={16} />
              Phone Number *
            </label>
            <input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageCircle className="inline mr-2" size={16} />
            Message *
          </label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Tell us about your inquiry..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Send className="mr-2" size={16} />
              Send Message
            </div>
          )}
        </button>

        {submitMessage && (
          <div className={`p-4 rounded-lg ${
            submitMessage.includes('successfully') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Contact Us Page Component
const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your learning journey? Get in touch with our team and discover how we can help you achieve your goals.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ContactForm />
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-blue-600 mr-4" size={20} />
                  <span className="text-gray-700">support@learningsoftware.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-blue-600 mr-4" size={20} />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Globe className="text-blue-600 mr-4" size={20} />
                  <span className="text-gray-700">www.learningsoftware.com</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Expert instructors with industry experience
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Hands-on projects and real-world applications
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  24/7 support and community access
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Career guidance and job placement assistance
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Review Slider Section */}
        <ReviewSlider />
      </div>
    </div>
  );
};

export default ContactUsPage;