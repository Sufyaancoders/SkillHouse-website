import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { RiLockPasswordLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import { resetPassword } from "../services/operations/authAPI"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const token =
      new URLSearchParams(location.search).get("token") ||
      location.pathname.split("/").at(-1)

    console.log("Reset password token:", token)

    if (!token) {
      toast.error("Invalid reset link. Please request a new one.")
      navigate("/forgot-password")
      return
    }
    // Ensure passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    
    // Add password strength validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }
    
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-gradient-to-b from-richblack-900 to-richblack-800">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-8 bg-richblack-800 rounded-2xl shadow-xl border border-richblack-700 transition-all duration-200 hover:shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-600 p-4 rounded-full">
              <RiLockPasswordLine className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-richblack-5 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Reset Your Password
              </h1>
              <p className="text-richblack-300">
                Create a strong new password to secure your account
              </p>
            </div>
          </div>
          
          <div className="bg-richblack-700 h-1 w-full rounded-full mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full" 
                 style={{ width: `${Math.min(password.length * 10, 100)}%` }}>
            </div>
          </div>
          
          <form onSubmit={handleOnSubmit} className="space-y-6">
            <label className="relative block">
              <p className="mb-1 text-sm text-richblack-5 font-medium flex items-center gap-2">
                <span className="text-blue-500">01</span> New Password <sup className="text-pink-500">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 bg-richblack-700 rounded-lg border border-richblack-600 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer hover:text-blue-500 transition-colors duration-200"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            
            <label className="relative block">
              <p className="mb-1 text-sm text-richblack-5 font-medium flex items-center gap-2">
                <span className="text-purple-500">02</span> Confirm New Password <sup className="text-pink-500">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className={`w-full px-4 py-3 bg-richblack-700 rounded-lg border text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  confirmPassword && password !== confirmPassword
                    ? "border-pink-500" 
                    : confirmPassword 
                      ? "border-green-500" 
                      : "border-richblack-600"
                }`}
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer hover:text-purple-500 transition-colors duration-200"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              
              {/* Password match indicator */}
              {confirmPassword && (
                <p className={`mt-1 text-xs ${
                  password === confirmPassword 
                    ? "text-green-500" 
                    : "text-pink-500"
                }`}>
                  {password === confirmPassword 
                    ? "✓ Passwords match" 
                    : "✗ Passwords don't match"}
                </p>
              )}
            </label>

            {/* Password strength indicator */}
            {password && (
              <div className="text-xs space-y-1">
                <p className="text-richblack-300">Password strength:</p>
                <ul>
                  <li className={`${password.length >= 8 ? "text-green-500" : "text-richblack-400"}`}>
                    {password.length >= 8 ? "✓" : "○"} At least 8 characters
                  </li>
                  <li className={`${/[A-Z]/.test(password) ? "text-green-500" : "text-richblack-400"}`}>
                    {/[A-Z]/.test(password) ? "✓" : "○"} Contains uppercase letter
                  </li>
                  <li className={`${/[0-9]/.test(password) ? "text-green-500" : "text-richblack-400"}`}>
                    {/[0-9]/.test(password) ? "✓" : "○"} Contains number
                  </li>
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/login">
              <p className="inline-flex items-center gap-2 text-richblack-300 hover:text-blue-500 transition-colors duration-200">
                <BiArrowBack /> Back to Login
              </p>
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-richblack-700 text-center">
            <p className="text-xs text-richblack-400">
              By resetting your password, you're keeping your account secure. 
              Remember to use a strong, unique password that you don't use for other websites.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword