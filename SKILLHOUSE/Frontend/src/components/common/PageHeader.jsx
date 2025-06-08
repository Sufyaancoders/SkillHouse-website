import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
      <div className="mt-4 flex justify-center">
        <div className="h-1 w-20 bg-blue-600 rounded"></div>
      </div>
    </div>
  );
};

export default PageHeader;
