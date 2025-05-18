import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { validateEmail } from '../utils/validation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    dispatch(getPasswordResetToken(email, setIsSubmitted));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="ml-2">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm mr-2">
                Skill<span className="text-gray-800 ml-2">House</span>
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {!isSubmitted ? 'Reset your password' : 'Check email'}
          </h1>
          <p className="text-gray-600 text-center">
            {!isSubmitted
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>
        </div>

        {!isSubmitted ? (
          <form 
            onSubmit={handleSubmit} 
            className="bg-white shadow-sm rounded-xl p-6 sm:p-8 border border-gray-100 transition-all duration-300 ease-in-out"
          >
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <sup className="text-pink-500">*</sup>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email address"
                  required
                  className={`pl-10 w-full rounded-lg border ${
                    error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 py-2 px-4 transition-all duration-200 ease-in-out`}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 animate-fade-in">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 focus:outline-none text-black font-medium rounded-lg py-2.5 px-5 flex items-center justify-center transition-all duration-200 ease-in-out"
            >
              {loading ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-white border-r-transparent"></span>
              ) : (
                <>
                  {!isSubmitted ? 'Submit' : 'Resend Email'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="bg-white shadow-sm rounded-xl p-6 sm:p-8 border border-gray-100 text-center animate-fade-in transition-all duration-300 ease-in-out">
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
              <p className="font-medium">Email Sent</p>
              <p className="text-sm mt-1">If an account exists with this email, a reset link will be sent.</p>
            </div>
            <p className="text-gray-600 mb-6">Please check your inbox and follow the instructions in the email.</p>
            <button 
              onClick={() => {
                setEmail('');
                setIsSubmitted(false);
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-200 ease-in-out"
            >
              Try another email
            </button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Link to="/login">
            <p className="flex items-center gap-x-2 text-blue-600 hover:text-blue-800 transition-all duration-200 ease-in-out">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need assistance?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-200 ease-in-out">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
