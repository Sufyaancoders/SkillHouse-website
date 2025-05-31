import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../../../services/operations/authAPI';
import VerificationInput from './VerificationInput';
import { Clock } from 'lucide-react';

const VerificationPage = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user data from Redux store or URL params
  const { loading } = useSelector((state) => state.auth);
  const signupData = useSelector((state) => state.auth.signupData);
  
  // Component state
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  // Handle OTP verification
  const handleComplete = (otp) => {
    setError(null);
    setIsVerifying(true);
    
    if (!signupData) {
      setError("Sign up data not found. Please try again.");
      setIsVerifying(false);
      return;
    }
    
    // Extract sign up data from Redux store
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
    
      // Log the extracted data (be careful with passwords in production)
  console.log("Verification request with:", { 
    accountType, 
    firstName, 
    lastName, 
    email,
    // Don't log actual passwords
    password: password ? "********" : undefined,
    confirmPassword: confirmPassword ? "********" : undefined,
    otp
  });
    // Dispatch the signup action
    setTimeout(() => {
      setIsVerifying(false);
      
      try {
        dispatch(
          signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
          )
        );
         console.log("signUp action dispatched successfully");
        // Note: The actual verification result will come from Redux
        // This will redirect via the navigate function in the signUp action
        setIsVerified(true);
      } catch (err) {
        setError(err.message || "Verification failed. Please try again.");
      }
    }, 1500);
  };
  
  const handleResend = () => {
    // You should implement the resend OTP functionality here
    setCanResend(false);
    setTimeLeft(60);
    setError(null);
    // Use your resend OTP API call here
    // For example: dispatch(resendOTP(email));
    alert("A new verification code has been sent to your email.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50">
      <div 
        className="w-full max-w-md p-8 rounded-2xl bg-white shadow-lg transition-all duration-500 ease-out transform"
        style={{
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)'
        }}
      >
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h1>
          <p className="text-gray-600 mb-1">We've sent a 6-digit verification code to {signupData?.email || 'your email'}.</p>
          <p className="text-gray-500 text-sm">Please enter the code below to complete your registration.</p>
        </div>
        
        <div 
          className={`transition-all duration-500 transform ${
            isVerified ? 'scale-0 opacity-0 h-0 overflow-hidden' : 'scale-100'
          }`}
        >
          <VerificationInput onComplete={handleComplete} />
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg animate-shake">
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={handleResend}
              disabled={!canResend || isVerifying || loading}
              className={`flex items-center text-sm font-medium ${
                canResend && !isVerifying && !loading
                  ? 'text-blue-600 hover:text-blue-700' 
                  : 'text-gray-400 cursor-not-allowed'
              } transition-colors duration-200`}
            >
              {!canResend && (
                <div className="flex items-center mr-2">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{timeLeft}s</span>
                </div>
              )}
              Resend Code
            </button>
          </div>
        </div>
        
        {(isVerifying || loading) && (
          <div className="flex justify-center mt-6">
            <div className="verification-loader"></div>
          </div>
        )}
        
        {isVerified && !loading && (
          <div className="success-animation text-center py-4">
            <div className="checkmark-circle">
              <div className="checkmark draw"></div>
            </div>
            <h2 className="text-xl font-semibold text-green-600 mt-4">Verification Successful!</h2>
            <p className="text-gray-600 mt-2">You are now being redirected to your account.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
