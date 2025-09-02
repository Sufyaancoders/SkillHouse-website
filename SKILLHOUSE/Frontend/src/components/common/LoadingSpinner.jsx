import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-slate-700 rounded-full"></div>
        {/* Spinning inner ring */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      {/* Loading text */}
      <p className="mt-4 text-slate-300 text-lg font-medium animate-pulse">
        {message}
      </p>
      
      {/* Loading dots */}
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
