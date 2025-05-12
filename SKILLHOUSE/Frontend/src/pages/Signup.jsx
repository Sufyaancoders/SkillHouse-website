// import signupImg from "../assets/Images/signup.webp"
// import Template from "../components/core/Auth/Template"

// function Signup() {
//   return (
//     <Template
//       title="Join the millions learning to code with StudyNotion for free"
//       description1="Build skills for today, tomorrow, and beyond."
//       description2="Education to future-proof your career."
//       image={signupImg}
//       formType="signup"
//     />
//   )
// }

// export default Signup
import React from 'react';
import SignupForm from '../components/core/Auth/signup/SignupForm';
import SignupAnimation from '../components/core/Auth/signup/SignupAnimation';
import Logo from '../components/core/Auth/signup/Logo';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 lg:p-16 justify-center">
        <div className="max-w-md mx-auto w-full">
          <Logo className="h-10 mb-8" />

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Welcome to SkillHOUSE
            </h1>
            <p className="text-lg text-slate-600">
              Build your skills. Share your knowledge.
            </p>
          </div>

          <SignupForm />
        </div>
      </div>

      {/* Animation Section */}
      <div className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center p-12">
        <SignupAnimation />
      </div>
    </div>
  );
};

export default SignupPage;
