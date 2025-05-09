import React, { useState } from 'react';
import UserTypeSelector from './UserTypeSelector';
import GoogleAuthButton from './GoogleAuthButton';
import { Eye, EyeOff } from 'lucide-react';

const SignupForm = () => {
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, userType });
    // Handle form submission logic here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full">
      <UserTypeSelector userType={userType} setUserType={setUserType} />
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
              First Name *
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your first name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
              Last Name *
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="you@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Create Password *
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Create a strong password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Account
          </button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6">
          <GoogleAuthButton />
        </div>
      </div>
      
      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
