import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { FiEye, FiEyeOff, FiLock, FiAlertCircle, FiCheck, FiX } from "react-icons/fi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

// Password validation schema
const PASSWORD_SCHEMA = {
  oldPassword: {
    required: "Please enter your current password",
    minLength: {
      value: 8,
      message: "Password should be at least 8 characters"
    }
  },
  newPassword: {
    required: "Please enter your new password",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    },
    validate: (value, formValues) => 
      value !== formValues.oldPassword || "New password cannot be the same as current password"
  },
  confirmNewPassword: {
    required: "Please confirm your new password",
    validate: (value, formValues) => 
      value === formValues.newPassword || "Passwords do not match"
  }
}

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm({
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    }
  })

  // Watch new password for strength indicator
  const newPassword = watch("newPassword")

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  // Password strength calculation
  const calculateStrength = (password) => {
    if (!password) return 0
    
    let strength = 0
    
    // Length check
    if (password.length >= 8) strength += 1
    if (password.length >= 12) strength += 1
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    
    return Math.min(strength, 5)
  }

  const getStrengthLabel = (strength) => {
    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
    return labels[strength] || ""
  }
  
  const getStrengthColor = (strength) => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-lime-500",
      "bg-green-400",
      "bg-green-500"
    ]
    return colors[strength] || "bg-slate-700"
  }

  const submitPasswordForm = async (data) => {
    setLoading(true)
    try {
      await changePassword(token, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      })
      
      toast.success("Password updated successfully")
      reset() // Clear the form
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.error("Error updating password:", error)
      toast.error(error?.response?.data?.message || "Failed to update password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Password input field component
  const PasswordField = ({ id, label, placeholder, ...rest }) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor={id} className="text-sm flex items-center gap-2 text-slate-300">
          <FiLock className="text-slate-400" size={14} />
          {label}
        </label>
        
        <div className="relative">
          <input
            type={passwordVisibility[id] ? "text" : "password"}
            id={id}
            placeholder={placeholder}
            className={`w-full rounded-md bg-slate-700 p-3 pl-3 pr-10 text-slate-100 border ${
              errors[id] ? "border-pink-500" : "border-slate-600"
            } focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors`}
            {...register(id, PASSWORD_SCHEMA[id])}
            disabled={loading}
            autoComplete={id === "oldPassword" ? "current-password" : "new-password"}
            {...rest}
          />
          
          <button
            type="button"
            onClick={() => togglePasswordVisibility(id)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            tabIndex="-1"
            aria-label={passwordVisibility[id] ? "Hide password" : "Show password"}
          >
            {passwordVisibility[id] ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        
        {errors[id] && (
          <div className="flex items-start gap-1 text-xs text-pink-200 mt-1">
            <FiAlertCircle className="mt-0.5 flex-shrink-0" />
            <span>{errors[id].message}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-800/80 backdrop-blur-sm p-6 sm:p-8 shadow-md my-10">
      <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
        <FiLock className="text-yellow-400" />
        Update Password
      </h2>

      <form onSubmit={handleSubmit(submitPasswordForm)} className="space-y-6">
        <div className="flex flex-col gap-6">
          {/* Current Password */}
          <PasswordField 
            id="oldPassword"
            label="Current Password" 
            placeholder="Enter your current password"
          />
          
          {/* New Password with Strength Indicator */}
          <div>
            <PasswordField 
              id="newPassword"
              label="New Password" 
              placeholder="Create a strong password"
            />
            
            {newPassword && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-slate-400">Password Strength:</p>
                  <p className={`text-xs font-medium ${
                    calculateStrength(newPassword) < 2 
                      ? "text-red-400" 
                      : calculateStrength(newPassword) < 4 
                        ? "text-yellow-400" 
                        : "text-green-400"
                  }`}>
                    {getStrengthLabel(calculateStrength(newPassword))}
                  </p>
                </div>
                
                <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getStrengthColor(calculateStrength(newPassword))} transition-all duration-300`}
                    style={{ width: `${(calculateStrength(newPassword) / 5) * 100}%` }}
                  ></div>
                </div>

                {/* Password requirements */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <RequirementCheck 
                    met={/[A-Z]/.test(newPassword)}
                    label="At least one uppercase letter"
                  />
                  <RequirementCheck 
                    met={/[a-z]/.test(newPassword)}
                    label="At least one lowercase letter"
                  />
                  <RequirementCheck 
                    met={/[0-9]/.test(newPassword)}
                    label="At least one number"
                  />
                  <RequirementCheck 
                    met={/[^A-Za-z0-9]/.test(newPassword)}
                    label="At least one special character"
                  />
                  <RequirementCheck 
                    met={newPassword.length >= 8}
                    label="Minimum 8 characters"
                  />
                  <RequirementCheck 
                    met={watch("oldPassword") && newPassword !== watch("oldPassword")}
                    label="Different from current password"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Confirm New Password */}
          <PasswordField 
            id="confirmNewPassword"
            label="Confirm New Password" 
            placeholder="Confirm your new password"
          />
        </div>

        {/* Form Actions */}
        <div className="flex flex-wrap justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="flex items-center gap-2 rounded-md bg-slate-700 py-2 px-5 font-medium text-slate-300 hover:bg-slate-600 transition-colors duration-200 disabled:opacity-70"
            disabled={loading}
          >
            <FiX size={16} /> Cancel
          </button>
          
          <IconBtn
            type="submit"
            text={loading ? "Updating..." : "Update Password"}
            disabled={loading || !isValid}
            customClasses={!isValid ? "opacity-70 cursor-not-allowed" : ""}
          >
            {!loading && <FiCheck size={16} />}
          </IconBtn>
        </div>
      </form>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="h-10 w-10 rounded-full border-4 border-slate-300 border-t-yellow-400 animate-spin mb-4"></div>
            <p className="text-slate-200">Updating your password...</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper component for password requirements
function RequirementCheck({ met, label }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${met ? "text-green-400" : "text-slate-400"}`}>
      {met ? <FiCheck className="text-green-400" /> : <FiX className="text-slate-400" />}
      <span>{label}</span>
    </div>
  )
}
