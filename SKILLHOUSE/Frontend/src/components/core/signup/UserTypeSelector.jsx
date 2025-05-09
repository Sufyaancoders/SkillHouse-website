import React from 'react';

const UserTypeSelector = ({ userType, setUserType }) => {
  return (
    <div className="flex p-1 w-full max-w-xs mx-auto bg-slate-100 rounded-lg">
      <button
        type="button"
        className={`w-1/2 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
          userType === 'student'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        onClick={() => setUserType('student')}
      >
        Student
      </button>
      <button
        type="button"
        className={`w-1/2 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
          userType === 'instructor'
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        onClick={() => setUserType('instructor')}
      >
        Instructor
      </button>
    </div>
  );
};

export default UserTypeSelector;
