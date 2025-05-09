import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="https://i.imgur.com/YQqQQZF.png" 
        alt="SkillHOUSE Logo" 
        className="h-12 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
